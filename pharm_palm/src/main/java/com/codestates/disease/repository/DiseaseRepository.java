package com.codestates.disease.repository;

import com.codestates.disease.entity.Disease;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
    List<Disease> findByDiseaseNameLike(String diseaseName);

}
