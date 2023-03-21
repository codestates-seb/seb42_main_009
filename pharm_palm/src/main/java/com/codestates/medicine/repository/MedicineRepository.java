package com.codestates.medicine.repository;

import com.codestates.medicine.entity.Medicine;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Page<Medicine> findByMedicineNameLike(String medicineName, Pageable pageable);

    Page<Medicine> findByMedicineIngredientLike(String medicineIngredient, Pageable pageable);

    Optional<Medicine> findByMedicineId(long medicineId);

    @Query("SELECT m FROM Medicine m WHERE m.medicineId = :medicineId")
    Medicine findByMedicineId(@Param("medicineId") Long medicineId);
}
