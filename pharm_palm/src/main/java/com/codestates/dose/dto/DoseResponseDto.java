package com.codestates.dose.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Time;

@Getter
@AllArgsConstructor
public class DoseResponseDto {
    private long doseId;
    private String medicineName;
    private int doseMount;
    private int doseNumber;
    private String doseTime;
}
