package com.codestates.disease.controller;

import com.codestates.disease.dto.DiseaseResponseDto;
import com.codestates.disease.service.DiseaseService;
import com.codestates.dto.MultiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/pp/diseases")
@Slf4j
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping("/name")
    public ResponseEntity getDisease(@RequestParam(required = false) String diseaseName) {
        if (diseaseName == null || diseaseName.isEmpty()) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Page<DiseaseResponseDto> diseaseResponses = diseaseService.findByDiseaseNameLike(diseaseName);
        List<DiseaseResponseDto> diseaseList = diseaseResponses.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(diseaseList, diseaseResponses), HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity getDiseases(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<DiseaseResponseDto> diseaseResponses = diseaseService.findDiseases(page -1,size);
        List<DiseaseResponseDto> diseaseList = diseaseResponses.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(diseaseList, diseaseResponses), HttpStatus.OK);
    }

}
