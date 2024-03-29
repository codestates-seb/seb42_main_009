package com.codestates.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    DISEASE_NOT_FOUND(404, "Disease not found"),
    MEDICINE_NOT_FOUND(404, "Medicine not found"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    DOSE_ALREADY_EXISTS(409,"Dose already exists"),
    DOSE_NOT_FOUND(404,"Dose not found"),
    WRONG_TOKEN_INPUT(403, "Wrong token inputted"),
    WITHDRAW_MEMBER(404,"탈퇴한 회원 입니다."),
    PASSWORD_NOT_MATCH(403, "비밀번호가 일치하지 않습니다."),

    LOGOUT_MEMBER(404, "이미 로그아웃한 회원 입니다.")
    ;

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
