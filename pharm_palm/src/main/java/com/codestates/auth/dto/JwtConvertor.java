package com.codestates.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Getter
@AllArgsConstructor
public class JwtConvertor {
    private String accessToken;
    private String refreshToken;
    private String accessToken_expiresAt;
    private String refreshToken_expiresAt;
}
