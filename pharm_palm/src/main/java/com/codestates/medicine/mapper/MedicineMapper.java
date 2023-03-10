package com.codestates.medicine.mapper;

import com.codestates.medicine.dto.MedicineResponseDto;
import com.codestates.medicine.entity.Medicine;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MedicineMapper {
    List<MedicineResponseDto> medicinesToMedicineResponse(List<Medicine> medicines);

    MedicineResponseDto medicineToMedicineResponseDto(Medicine medicine);
}
