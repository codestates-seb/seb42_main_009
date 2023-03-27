package com.codestates.medicine.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MedicineLikeResponseDto {
    private long medicineLike;
    private String medicineName;
}
