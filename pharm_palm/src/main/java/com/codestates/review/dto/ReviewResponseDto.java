package com.codestates.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String reviewContent;
    private String reviewImg;
    private String reviewOtherMedicine;
    private Long memberId;
}
