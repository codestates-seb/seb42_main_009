package com.codestates.disease.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DiseaseResponseDto {
    private long diseaseId;
    private String diseaseName;

}
