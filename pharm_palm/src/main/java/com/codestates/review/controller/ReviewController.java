package com.codestates.review.controller;

import com.codestates.dto.MultiResponseDto;
import com.codestates.dto.SingleResponseDto;
import com.codestates.review.dto.ReviewPatchDto;
import com.codestates.review.dto.ReviewPostDto;
import com.codestates.review.entity.Review;
import com.codestates.review.mapper.ReviewMapper;
import com.codestates.review.service.ReviewService;
import com.codestates.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/pp/reviews")
@Validated
@Slf4j
@RequiredArgsConstructor
public class ReviewController {
    private final static String REVIEW_DEFAULT_URL = "/pp/reviews";
    private final ReviewService reviewService;
    private final ReviewMapper mapper;

    @PostMapping
    public ResponseEntity postReview(@Valid @RequestBody ReviewPostDto reviewPostDto) {
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.reviewToReviewResponseDto(
                reviewService.createReview(mapper.reviewPostDtoToReview(reviewPostDto)))), HttpStatus.CREATED);
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") @Positive long reviewId,
                                      @Valid @RequestBody ReviewPatchDto reviewPatchDto) {
        reviewPatchDto.setReviewId(reviewId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reviewToReviewResponseDto
                        (reviewService.updateReview(mapper.reviewPatchDtoToReview(reviewPatchDto)))), HttpStatus.OK);
    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") @Positive long reviewId) {
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.reviewToReviewResponseDto
                        (reviewService.findReview(reviewId))), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getReviews(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        mapper.reviewToReviewResponseDtos(reviewService.findReviews(page - 1, size).getContent())
                        , reviewService.findReviews(page - 1, size)), HttpStatus.OK);
    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") @Positive long reviewId) {
        reviewService.deleteReview(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
