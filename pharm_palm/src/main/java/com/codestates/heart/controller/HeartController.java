package com.codestates.heart.controller;

import com.codestates.heart.dto.HeartPostDto;
import com.codestates.heart.service.HeartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/pp/heart")
@Validated
@Slf4j
public class HeartController {

    private final HeartService heartService;

    public HeartController(HeartService heartService) {
        this.heartService = heartService;
    }

    @PostMapping
    public ResponseEntity postHeart(@RequestBody HeartPostDto heartPostDto) {
        heartService.addLike(heartPostDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findHeart(@RequestBody HeartPostDto heartPostDto) {
        boolean heart = heartService.findLike(heartPostDto);
        return new ResponseEntity(heart, HttpStatus.OK);
    }
}
