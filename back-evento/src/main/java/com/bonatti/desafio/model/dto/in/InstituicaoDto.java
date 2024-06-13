package com.bonatti.desafio.model.dto.in;

import com.bonatti.desafio.model.enums.TipoInstituicao;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class InstituicaoDto {

    @NotBlank
    @NotNull
    @Size(min = 10, max = 200)
    @Schema(example = "Nome da empresa", required = true)
    private String nome;

    @NotBlank
    @NotNull
    @Schema(required = true)
    private TipoInstituicao tipo;
}
