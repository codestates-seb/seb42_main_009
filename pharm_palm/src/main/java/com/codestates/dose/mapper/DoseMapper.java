package com.codestates.dose.mapper;

import com.codestates.dose.dto.DosePostDto;
import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.entity.Dose;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DoseMapper {
    Dose dosePostDtoToDose(DosePostDto dosePostDto);

    DoseResponseDto doseToResponseDto(Dose dose);


//    List<DoseResponseDto> dosesToDoseResponses(List<Dose> doses);

    default List<DoseResponseDto> dosesToDoseResponses(
            List<Dose> doses) {
        return doses.stream()
                .map(dose -> DoseResponseDto
                        .builder()
                        .doseId(dose.getDoseId())
                        .doseNumber(dose.getDoseNumber())
                        .doseTimes(dose.getDoseTimes())
                        .doseMount(dose.getDoseMount())
                        .medicineName(dose.getMedicine().getMedicineName())
                        .memberId(dose.getMember().getMemberId())
                        .medicineId(dose.getMedicine().getMedicineId())
                        .build())
                .collect(Collectors.toList());

    }

}
