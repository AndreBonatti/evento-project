package com.bonatti.desafio.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "TB_EVENTO")
public class Evento implements Serializable {

    @Id
    @Column(name = "ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEvento;

    @Column(name = "NOME")
    @Max(200)
    private String nome;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATA_INICIAL")
    private Date dataInicial;

    @Temporal(TemporalType.DATE)
    @Column(name = "DATA_FINAL")
    private Date dataFinal;

    @Column(name = "ATIVO")
    private Boolean ativo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INSTITUICAO_ID")
    private Instituicao instituicao;

}
