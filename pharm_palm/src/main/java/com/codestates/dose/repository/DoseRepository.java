package com.codestates.dose.repository;

import com.codestates.dose.entity.Dose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoseRepository extends JpaRepository<Dose, Long> {
    Optional<Dose> findByMemberIdAndMedicineName(Long memberId, String medicineName);
}
