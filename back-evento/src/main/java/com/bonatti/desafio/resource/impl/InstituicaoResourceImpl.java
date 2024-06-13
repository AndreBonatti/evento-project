package com.bonatti.desafio.resource.impl;

import com.bonatti.desafio.model.dto.in.InstituicaoDto;
import com.bonatti.desafio.model.dto.out.PageResponse;
import com.bonatti.desafio.model.entity.Instituicao;
import com.bonatti.desafio.repository.InstituicaoRepository;
import com.bonatti.desafio.resource.EventoResource;
import com.bonatti.desafio.resource.InstituicaoResource;
import com.bonatti.desafio.service.MapperService;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
public class InstituicaoResourceImpl implements InstituicaoResource {

    @Inject
    InstituicaoRepository instituicaoRepository;

    @Inject
    MapperService mapperService;

    @Override
    public Response findAll(int offset, int limit) {

        PanacheQuery<Instituicao> query = instituicaoRepository.findAll();
        query.page(Page.of(offset, limit));
        List<Instituicao> content = query.list();
        long totalElements = query.count();
        int totalPages = query.pageCount();

        PageResponse<Instituicao> pageResponse = new PageResponse<>(
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
        return Response.ok(instituicaoRepository.findById(id)).build();
    }

    @Override
    public Response created(InstituicaoDto instituicaoDto) {

        try {

            Instituicao instituicao = mapperService.convertMapper(instituicaoDto, Instituicao.class);
            instituicaoRepository.persist(instituicao);

            final URI processIdUri = UriBuilder.fromResource(EventoResource.class)
                    .path("{id}").build(instituicao.getIdInstituicao());

            return Response.created(processIdUri).build();

        } catch (Exception e) {
            log.error(e.getMessage());
            return Response.serverError().build();
        }
    }

    @Transactional
    @Override
    public Response updated(Integer id, InstituicaoDto instituicaoDto) {


        try {
            instituicaoRepository.findByIdOptional(id).ifPresentOrElse(instituicao -> {
                        instituicao.setNome(instituicaoDto.getNome());
                        instituicao.setTipo(instituicaoDto.getTipo());

                        instituicaoRepository.persist(instituicao);

                    },
                    () -> {
                        throw new NoSuchElementException("Instituto não encontrado");
                    });

            return Response.ok().build();

        } catch (NoSuchElementException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }

    }

    @Override
    public Response delete(Integer id) {
        Optional<Instituicao> instituicaoOptional = instituicaoRepository.findByIdOptional(id);

        if (!instituicaoOptional.isPresent())
            return Response.status(Response.Status.NOT_FOUND).entity("Instituto não encontrado").build();

        instituicaoRepository.deleteAllCascate(id);
        return Response.noContent().build();
    }
}
