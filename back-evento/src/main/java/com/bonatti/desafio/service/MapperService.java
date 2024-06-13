package com.bonatti.desafio.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import javax.enterprise.context.ApplicationScoped;

import java.text.SimpleDateFormat;

@ApplicationScoped
public class MapperService {

    private static ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
    }

    public <T> T convertMapper(Object obj, Class<T> classe) {
        return objectMapper.convertValue(obj, classe);
    }

    public <T> T updateObject(Object atual, Object old) throws JsonMappingException {
        return (T) objectMapper.updateValue(atual, old);
    }


}
