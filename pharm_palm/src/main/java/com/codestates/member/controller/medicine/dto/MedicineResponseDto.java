package com.codestates.member.controller.medicine.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicineResponseDto {
    private Long medicineId;
    private String medicineName;
    private String medicineIngredient;
    private String medicineUse;
    private Long medicineLike;
    private String medicineImg;
}
