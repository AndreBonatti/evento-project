package com.bonatti.desafio.resource.impl;

import com.bonatti.desafio.model.dto.in.EventoDto;
import com.bonatti.desafio.model.dto.out.PageResponse;
import com.bonatti.desafio.model.entity.Evento;
import com.bonatti.desafio.model.entity.Instituicao;
import com.bonatti.desafio.repository.EventoRepository;
import com.bonatti.desafio.repository.InstituicaoRepository;
import com.bonatti.desafio.resource.EventoResource;
import com.bonatti.desafio.service.MapperService;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
public class EventoResourceImpl implements EventoResource {

    @Inject
    EventoRepository eventoRepository;

    @Inject
    InstituicaoRepository instituicaoRepository;

    @Inject
    MapperService mapperService;

    @Override
    public Response findAll(int offset, int limit) {

        PanacheQuery<Evento> query = eventoRepository.findAll();
        query.page(Page.of(offset, limit));
        List<Evento> content = query.list();
        long totalElements = query.count();
        int totalPages = query.pageCount();

        PageResponse<Evento> pageResponse = new PageResponse<>(
                content,
                totalElements,
                totalPages,
                offset,
                limit
        );

        return Response.ok(pageResponse).build();
    }

    @Override
    public Response findByID(Integer id) {
        return Response.ok(eventoRepository.findById(id)).build();
    }

    @Override
    public Response created(EventoDto eventoDto) {

        try {

            Evento evento = validationRoles(eventoDto);
            eventoRepository.persist(evento);

            final URI processIdUri = UriBuilder.fromResource(EventoResource.class)
                    .path("{id}").build(evento.getIdEvento());

            return Response.created(processIdUri).build();
        } catch (NoSuchElementException ex) {
            return Response.status(Response.Status.NOT_FOUND).entity(ex.getMessage()).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }

    }

    private Evento validationRoles(EventoDto eventoDto) throws BadRequestException, NoSuchElementException {

        Evento evento = mapperService.convertMapper(eventoDto, Evento.class);
        LocalDate dataAtual = LocalDate.now();
        LocalDate dataInicial = evento.getDataInicial().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate dataFinal = evento.getDataFinal().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        if (!isEqualsGreater(dataAtual, dataFinal))
            throw new BadRequestException("Data final não pode ser menor que data atual");

        if (!isEqualsGreater(dataInicial, dataFinal))
            throw new BadRequestException("Data inicial não pode ser menor que data final");

        Optional<Instituicao> instituicao = instituicaoRepository.findByIdOptional(eventoDto.getInstituicaoId());

        if (!instituicao.isPresent())
            throw new NoSuchElementException("Instituto não encontrado");

        evento.setInstituicao(instituicao.get());
        evento.setAtivo(true);

        return evento;
    }

    private boolean isEqualsGreater(LocalDate dataIncial, LocalDate dataFinal) {
        if (dataFinal.isAfter(dataIncial) || dataFinal.isEqual(dataIncial)) {
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public Response updated(Integer id, EventoDto eventoDto) {

        try {
            Evento parse = validationRoles(eventoDto);

            eventoRepository.findByIdOptional(id).ifPresent(evento -> {
                evento.setAtivo(true);
                evento.setDataInicial(parse.getDataInicial());
                evento.setDataFinal(parse.getDataFinal());
                evento.setNome(parse.getNome());
                evento.setInstituicao(parse.getInstituicao());
                eventoRepository.persist(evento);
            });
            return Response.ok().build();
        } catch (NoSuchElementException ex) {
            return Response.status(Response.Status.NOT_FOUND).entity(ex.getMessage()).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @Override
    public Response delete(Integer id) {
        Optional<Evento> eventoOptional = eventoRepository.findByIdOptional(id);

        if (!eventoOptional.isPresent())
            return Response.status(Response.Status.NOT_FOUND).entity("Evento não encontrado").build();

        eventoRepository.delete(eventoOptional.get());
        return Response.noContent().build();
    }

}
