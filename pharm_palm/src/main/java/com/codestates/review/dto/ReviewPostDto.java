package com.codestates.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class ReviewPostDto {
    @NotBlank(message = "내용을 입력해 주세요.")
    private String reviewContent;
    private String reviewImg;
    private String reviewOtherMedicine;
    @NotNull(message = "회원의 아이디를 입력해 주세요.")
    private Long memberId;
}
