package com.codestates.member.controller.medicine.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.controller.medicine.entity.Medicine;
import com.codestates.member.controller.medicine.repository.MedicineRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MedicineService {
    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public Page<Medicine> findMedicines(int page, int size) {
        return medicineRepository.findAll(PageRequest.of(page, size,
                Sort.by("medicineId").descending()));
    }

    public Medicine findVerifiedMedicine(long medicineId) {
        Optional<Medicine> optionalMedicine = medicineRepository.findById(medicineId);
        Medicine findMedicine = optionalMedicine.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEDICINE_NOT_FOUND));

        return findMedicine;
    }
}
