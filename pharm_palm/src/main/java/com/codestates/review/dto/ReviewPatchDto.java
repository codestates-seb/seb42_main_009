package com.codestates.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@AllArgsConstructor
public class ReviewPatchDto {
    private Long reviewId;
    @NotBlank(message = "내용을 입력해 주세요.")
    private String reviewContent;
    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }
}
