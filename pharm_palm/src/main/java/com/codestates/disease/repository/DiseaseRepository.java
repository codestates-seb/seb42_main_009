package com.codestates.disease.repository;

import com.codestates.disease.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
}
