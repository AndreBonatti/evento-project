package com.bonatti.desafio.resource;

import com.bonatti.desafio.config.ConstantExceptionMessage;
import com.bonatti.desafio.model.dto.in.InstituicaoDto;
import com.bonatti.desafio.model.entity.Instituicao;
import io.smallrye.common.constraint.NotNull;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("/v1/instituicao")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Instituição")
public interface InstituicaoResource {

    @GET
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "BUSCA Paginada", content = @Content(schema = @Schema(implementation = Instituicao.class))),
            @APIResponse(responseCode = "400", description = ConstantExceptionMessage.BAD_REQUEST_400),
            @APIResponse(responseCode = "404", description = ConstantExceptionMessage.NOT_FOUND_404),
            @APIResponse(responseCode = "500", description = ConstantExceptionMessage.INTERNAL_SERVER_ERROR_500)
    })
    @Operation(summary = "Consulta paginada", description = "descricao")
    Response findAll(@Parameter(example = "0", required = true) @QueryParam("offset") @NotNull @Min(0) int offset,
                     @Parameter(example = "20", required = true) @QueryParam("limit") @NotNull @Min(10) @Max(1000) int limit);

    @GET
    @Path("{id}")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "BUSCA PELO ID", content = @Content(schema = @Schema(implementation = Instituicao.class))),
            @APIResponse(responseCode = "400", description = ConstantExceptionMessage.BAD_REQUEST_400),
            @APIResponse(responseCode = "404", description = ConstantExceptionMessage.NOT_FOUND_404),
            @APIResponse(responseCode = "500", description = ConstantExceptionMessage.INTERNAL_SERVER_ERROR_500)
    })
    @Operation(summary = "Consulta pelo id", description = "descricao")
    Response findByID(@PathParam("id") Integer id);

    @POST
    @APIResponses(value = {
            @APIResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = URI.class))),
            @APIResponse(responseCode = "400", description = ConstantExceptionMessage.BAD_REQUEST_400),
            @APIResponse(responseCode = "500", description = ConstantExceptionMessage.INTERNAL_SERVER_ERROR_500)
    })
    @Operation(summary = "Criacao do instituicao", description = "descricao")
    Response created(@Valid InstituicaoDto instituicaoDto);

    @PUT
    @Path("{id}")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Updated"),
            @APIResponse(responseCode = "400", description = ConstantExceptionMessage.BAD_REQUEST_400),
            @APIResponse(responseCode = "404", description = ConstantExceptionMessage.NOT_FOUND_404),
            @APIResponse(responseCode = "500", description = ConstantExceptionMessage.INTERNAL_SERVER_ERROR_500)
    })
    @Operation(summary = "Alteracao do instituicao", description = "descricao")
    Response updated(@PathParam("id") Integer id, @Valid InstituicaoDto instituicaoDto);

    @DELETE
    @Path("{id}")
    @APIResponses(value = {
            @APIResponse(responseCode = "204", description = "Delete"),
            @APIResponse(responseCode = "404", description = ConstantExceptionMessage.NOT_FOUND_404),
            @APIResponse(responseCode = "500", description = ConstantExceptionMessage.INTERNAL_SERVER_ERROR_500)
    })
    @Operation(summary = "Remocao do instituicao", description = "descricao")
    Response delete(@PathParam("id") Integer id);

}