package com.bonatti.desafio.scheduler;

import com.bonatti.desafio.repository.EventoRepository;
import io.quarkus.scheduler.Scheduled;
import lombok.extern.slf4j.Slf4j;

import javax.inject.Inject;

@Slf4j
public class Agendamento {

    @Inject
    EventoRepository eventoRepository;

    @Scheduled(cron = "${config.event.expired}")
    void desabilitarEventoExpirados() {
        log.info("Agendamento diário desabilitar eventos expirados");
        eventoRepository.desabilitarEventoExpirados();
    }
}
