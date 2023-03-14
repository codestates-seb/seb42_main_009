package com.codestates.dose.controller;

import com.codestates.dose.dto.DosePostDto;
import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.service.DoseService;
import com.codestates.dto.SingleResponseDto;
import com.codestates.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/pp/doses")
@Validated
@Slf4j
public class DoseController {
    private final static String DOSE_DEFAULT_URL = "/pp/doses";
    private final DoseService doseService;

    public DoseController(DoseService doseService) {
        this.doseService = doseService;
    }

    @PostMapping
    public ResponseEntity postDose(@Valid @RequestBody DosePostDto dosePostDto) {
        DoseResponseDto doseResponseDto = doseService.createDose(dosePostDto);

        return new ResponseEntity<>(
                new SingleResponseDto<>(doseResponseDto), HttpStatus.CREATED);
    }
}