package com.codestates.auth.refreshToken.controller;


import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.auth.utils.JwtToMemberInfoUtils;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

public class RefreshTokenController {

    private final JwtToMemberInfoUtils jwtToMemberInfoUtils;

    public RefreshTokenController(JwtToMemberInfoUtils jwtToMemberInfoUtils) {
        this.jwtToMemberInfoUtils = jwtToMemberInfoUtils;
    }

    @GetMapping
    public ResponseEntity getReissueAccessToken (@RequestHeader HttpHeaders httpHeaders){

        String accessToken;
        try{
            accessToken = httpHeaders.get("Authorization").get(0);
        }catch (NullPointerException exception){
            throw new MalformedJwtException("Access토큰의 형식이 올바르지 않습니다.");
        }

        String refreshToken;
        try{
            refreshToken = httpHeaders.get("Authorization").get(0);
        }catch (NullPointerException exception){
            throw new MalformedJwtException("Refresh토큰의 형식이 올바르지 않습니다.");
        }

    }
}
