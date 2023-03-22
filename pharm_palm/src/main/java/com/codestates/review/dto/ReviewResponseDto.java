package com.codestates.review.dto;

import com.codestates.disease.entity.Disease;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String reviewContent;
    private String reviewImg;
    private String reviewOtherMedicine;
    private Long memberId;
    private List<Disease> diseases;
}
