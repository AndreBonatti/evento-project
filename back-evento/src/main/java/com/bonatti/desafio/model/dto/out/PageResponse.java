package com.bonatti.desafio.model.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageResponse<T> {

    public List<T> content;
    public long totalElements;
    public int totalPages;
    public int pageNumber;
    public int pageSize;
}
