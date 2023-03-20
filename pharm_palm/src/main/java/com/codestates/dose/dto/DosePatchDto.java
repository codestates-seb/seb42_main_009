package com.codestates.dose.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class DosePatchDto {
    @NotBlank
    private String doseMount;
    @Positive
    private int doseNumber;
    private String doseTimes;
}
