package com.codestates.heart.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class HeartPostDto {
    @NotNull(message = "좋아요를 누른 회원의 memberId를 입력해주세요.")
    private Long memberId;
    @NotNull(message = "좋아요를 누른 약품의 medicineId를 입력해주세요")
    private Long medicineId;
}
