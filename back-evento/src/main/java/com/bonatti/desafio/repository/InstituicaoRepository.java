package com.bonatti.desafio.repository;

import com.bonatti.desafio.model.entity.Instituicao;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@ApplicationScoped
public class InstituicaoRepository implements PanacheRepositoryBase<Instituicao, Integer> {

    @Inject
    EntityManager em;

    @Transactional
    @Override
    public void persist(Instituicao instituicao) {
        PanacheRepositoryBase.super.persist(instituicao);
    }

    @Transactional
    @Override
    public void delete(Instituicao instituicao) {
        PanacheRepositoryBase.super.delete(instituicao);
    }

    @Transactional
    public void deleteAllCascate(Integer id) {

        em.createNativeQuery("DELETE FROM TB_EVENTO WHERE INSTITUICAO_ID IN (SELECT ID FROM PUBLIC.TB_INSTITUICAO WHERE ID = :id)")
                .setParameter("id", id)
                .executeUpdate();

        em.createNativeQuery("DELETE FROM TB_INSTITUICAO WHERE ID = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
}
