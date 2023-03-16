package com.codestates.disease.controller;

import com.codestates.disease.service.DiseaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pp/disease")
@Slf4j
public class DiseaseController {

    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

    @GetMapping("/name")
    public ResponseEntity getDisease() {
        return null;
    }

    @GetMapping
    public ResponseEntity getDiseases() {
        return null;
    }

}
