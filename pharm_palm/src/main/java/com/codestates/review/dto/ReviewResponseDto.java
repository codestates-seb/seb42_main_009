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
    private List<String> reviewImg;
    private String memberImg;
    private Long memberId;
    private String memberName;
    private Long medicineId;
    private Boolean oauthMember;
    private String createdAt;
    private String lastModifiedAt;
    private List<Disease> diseases;
}
