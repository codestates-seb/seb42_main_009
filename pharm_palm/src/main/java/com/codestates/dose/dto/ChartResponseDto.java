package com.codestates.dose.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@NoArgsConstructor
@Getter
public class ChartResponseDto {
    private String medicineName;
    private String memberGender;
    private Long count;
}
