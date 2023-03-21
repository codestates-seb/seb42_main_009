package com.codestates.dose.mapper;

import com.codestates.dose.dto.DosePostDto;
import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.entity.Dose;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DoseMapper {
    Dose dosePostDtoToDose(DosePostDto dosePostDto);
    DoseResponseDto dosePostDtoToResponseDto(DosePostDto dosePostDto);

    DoseResponseDto doseToResponseDto(Dose dose);

    List<DoseResponseDto> dosesToDoseResponses(List<Dose> doses);

}
