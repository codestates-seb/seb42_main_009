package com.codestates.medicine.dto;

import com.codestates.dose.dto.DoseResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.util.List;


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
    private String medicineWarn;
    private String medicineEntp;
    private String medicineDeposit;
    private List<DoseResponseDto> doses;

}
