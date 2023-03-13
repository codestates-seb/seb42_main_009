package com.codestates.medicine.repository;

import com.codestates.medicine.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByMedicineNameLike(String medicineName);

    List<Medicine> findByMedicineIngredientLike(String medicineIngredient);
}
