package com.bonatti.desafio.model.entity;


import com.bonatti.desafio.model.enums.TipoInstituicao;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import javax.persistence.*;
import javax.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "TB_INSTITUICAO")
public class Instituicao extends PanacheEntityBase implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idInstituicao;

    @Column(name = "NOME")
    @Max(200)
    private String nome;

    @Column(name = "TIPO")
    private TipoInstituicao tipo;

}
