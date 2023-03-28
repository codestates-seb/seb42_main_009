package com.codestates.disease.service;

import com.codestates.disease.dto.DiseaseResponseDto;
import com.codestates.disease.entity.Disease;
import com.codestates.disease.mapper.DiseaseMapper;
import com.codestates.disease.repository.DiseaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiseaseService {
    private final DiseaseRepository diseaseRepository;

    private final DiseaseMapper mapper;

    public DiseaseService(DiseaseRepository diseaseRepository, DiseaseMapper mapper) {
        this.diseaseRepository = diseaseRepository;
        this.mapper = mapper;
    }

//    @PostConstruct
//    public void defaultDiseases(DiseasesData diseasesData) {
//        List<Disease> diseases = diseasesData.getDiseaseList();
//        diseaseRepository.saveAll(diseases);
//    }


    public Page<DiseaseResponseDto> findByDiseaseNameLike (String diseaseName) {
        List<Disease> diseases = diseaseRepository.findByDiseaseNameLike("%" + diseaseName + "%")
                .stream()
                .sorted(Comparator.comparing(Disease::getDiseaseName))
                .collect(Collectors.toList());
        List<DiseaseResponseDto> diseaseResponses = mapper.diseasesToResponseDto(diseases);

        return new PageImpl<>(diseaseResponses);
    }

    public Page<DiseaseResponseDto> findDiseases() {
        List<Disease> diseases = diseaseRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Disease::getDiseaseName))
                .collect(Collectors.toList());
        List<DiseaseResponseDto> diseaseResponses = mapper.diseasesToResponseDto(diseases);


        return new PageImpl<>(diseaseResponses);
    }
}
