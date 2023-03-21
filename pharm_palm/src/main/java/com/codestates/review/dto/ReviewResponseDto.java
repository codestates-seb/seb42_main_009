package com.codestates.review.dto;

import com.codestates.disease.entity.Disease;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


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
    private List<Disease> diseases;
}
