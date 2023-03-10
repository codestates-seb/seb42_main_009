package com.codestates.member.controller.medicine.controller;

import com.codestates.dto.MultiResponseDto;
import com.codestates.dto.SingleResponseDto;
import com.codestates.member.controller.medicine.entity.Medicine;
import com.codestates.member.controller.medicine.mapper.MedicineMapper;
import com.codestates.member.controller.medicine.service.MedicineService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/pp/medicines")
@Validated
@Slf4j
public class MedicineController {
    private final static String MEDICINE_DEFAULT_URL = "/pp/medicines";
    private final MedicineService medicineService;
    private final MedicineMapper mapper;

    public MedicineController(MedicineService medicineService, MedicineMapper mapper) {
        this.medicineService = medicineService;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity getMedicines(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Medicine> pageMedicines = medicineService.findMedicines(page - 1, size);
        List<Medicine> medicines = pageMedicines.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(mapper.medicinesToMedicineResponse(medicines),
                        pageMedicines),
                HttpStatus.OK);
    }

    @GetMapping("/{medicine-id}")
    public ResponseEntity getMedicine(
            @PathVariable("medicine-id") @Positive long medicineId) {
        Medicine medicine = medicineService.findVerifiedMedicine(medicineId);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.medicineToMedicineResponseDto(medicine))
                , HttpStatus.OK);
    }
}
