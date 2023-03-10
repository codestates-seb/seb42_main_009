package com.codestates.member.controller.medicine.repository;

import com.codestates.member.controller.medicine.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
}
