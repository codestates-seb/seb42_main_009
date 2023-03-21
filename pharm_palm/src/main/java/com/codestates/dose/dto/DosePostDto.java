package com.codestates.dose.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.sql.Time;

@Getter
@AllArgsConstructor
public class DosePostDto {
    @Positive
    private Long memberId;
    @NotBlank
    private String medicineName;

    @Positive
    private int doseMount;

    @Positive
    private int doseNumber;

    private String doseTime;
}
