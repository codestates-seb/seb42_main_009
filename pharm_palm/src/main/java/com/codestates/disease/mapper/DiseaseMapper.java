package com.codestates.disease.mapper;

import com.codestates.disease.dto.DiseaseResponseDto;
import com.codestates.disease.entity.Disease;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DiseaseMapper {
    List<DiseaseResponseDto> diseasesToResponseDto(List<Disease> diseases);
}
