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
