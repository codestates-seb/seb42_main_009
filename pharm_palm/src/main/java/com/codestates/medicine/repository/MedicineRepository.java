package com.codestates.medicine.repository;

import com.codestates.medicine.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Page<Medicine> findByMedicineNameLike(String medicineName, Pageable pageable);

    Page<Medicine> findByMedicineIngredientLike(String medicineIngredient, Pageable pageable);
}
