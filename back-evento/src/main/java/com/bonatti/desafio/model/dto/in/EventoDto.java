package com.bonatti.desafio.model.dto.in;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class EventoDto {

    @NotBlank
    @NotNull
    @Size(min = 10, max = 200)
    @Schema(example = "Confraternização da empresa", required = true)
    private String nome;
    @NotBlank
    @NotNull
    @Size(min = 10, max = 10)
    @Schema(example = "2024-04-01", required = true)
    private String dataInicial;
    @NotBlank
    @NotNull
    @Size(min = 10, max = 10)
    @Schema(example = "2024-04-30", required = true)
    private String dataFinal;
    @NotBlank
    @NotNull
    @Schema(example = "1")
    private Integer instituicaoId;

}

