package com.codestates.auth.utils;


import com.codestates.auth.jwt.JwtTokenizer;

import io.jsonwebtoken.Claims;

import org.springframework.stereotype.Component;

@Component
public class JwtToMemberInfoUtils {

    private final JwtTokenizer jwtTokenizer;

    public JwtToMemberInfoUtils(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    public Long extractMemberIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        Claims claims = jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();

        Long memberId = claims.get("memberId", Long.class);

        return memberId;
    }

}
