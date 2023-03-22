package com.codestates.disease.service;

import com.codestates.disease.DiseasesData;
import com.codestates.disease.entity.Disease;
import com.codestates.disease.mapper.DiseaseMapper;
import com.codestates.disease.repository.DiseaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

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


    public Disease findDisease () {
        return null;
    }

    public List<Disease> findDiseases() {
        return null;
    }
}
