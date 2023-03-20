package com.codestates.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String reviewContent;
    private String reviewImg;
    private String reviewOtherMedicine;
    private Long memberId;
    private Long medicineId;
    private String createdAt;
    private String lastModifiedAt;
}
