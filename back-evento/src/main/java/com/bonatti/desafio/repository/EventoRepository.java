package com.bonatti.desafio.repository;

import com.bonatti.desafio.model.entity.Evento;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

@ApplicationScoped
public class EventoRepository implements PanacheRepositoryBase<Evento, Integer> {

    @Inject
    EntityManager em;

    @Transactional
    @Override
    public void persist(Evento evento) {
        PanacheRepositoryBase.super.persist(evento);
    }

    @Transactional
    @Override
    public void persistAndFlush(Evento evento) {
        PanacheRepositoryBase.super.persistAndFlush(evento);
    }

    @Transactional
    @Override
    public void delete(Evento evento) {
        PanacheRepositoryBase.super.delete(evento);
    }


    @Transactional
    public void desabilitarEventoExpirados() {
        Query query= em.createNativeQuery("UPDATE TB_EVENTO SET ATIVO = FALSE WHERE DATA_FINAL < CURRENT_TIMESTAMP");
        query.executeUpdate();
    }

}
