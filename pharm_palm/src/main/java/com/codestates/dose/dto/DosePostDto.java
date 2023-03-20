package com.codestates.dose.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.sql.Time;
import java.util.List;

@Getter
@AllArgsConstructor
public class DosePostDto {
    @Positive
    private Long memberId;
    @Positive
    private Long medicineId;

    @NotBlank
    private String doseMount;
    @Positive
    private int doseNumber;

    private String doseTimes;

}
