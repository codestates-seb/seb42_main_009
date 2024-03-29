package com.codestates.dose.controller;

import com.codestates.dose.dto.ChartResponseDto;
import com.codestates.dose.dto.DosePatchDto;
import com.codestates.dose.dto.DosePostDto;
import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.service.DoseService;
import com.codestates.querydsl.repository.QueryRepository;
import com.querydsl.core.Tuple;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/pp/doses")
@Validated
@Slf4j
public class DoseController {
    private final DoseService doseService;
    private final QueryRepository queryRepository;

    public DoseController(DoseService doseService, QueryRepository queryRepository) {
        this.doseService = doseService;
        this.queryRepository = queryRepository;
    }

    @PostMapping
    public ResponseEntity postDose(@Valid @RequestBody DosePostDto dosePostDto) {
        doseService.createDose(dosePostDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/info/{member-id}")
    public ResponseEntity getDose(@PathVariable("member-id") @Positive long memberId) {
        List<DoseResponseDto> doseResponseDto = doseService.findDoses(memberId);
        return new ResponseEntity<>(doseResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{dose-id}")
    public ResponseEntity deleteDose(@PathVariable("dose-id") @Positive long doseId) {
        doseService.deleteDose(doseId);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{dose-id}")
    public ResponseEntity patchDose(@PathVariable("dose-id") @Positive long doseId,
                                    @Valid @RequestBody DosePatchDto dosePatchDto) {
        doseService.updateDose(doseId, dosePatchDto);

        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @GetMapping("/gender")
    public ResponseEntity getByGender(@RequestParam String gender) {
        List<ChartResponseDto> result = queryRepository.findByDoseGender(gender);
                return new ResponseEntity(result,HttpStatus.OK);
    }
}
