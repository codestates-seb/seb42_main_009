package com.codestates.auth.refreshToken.controller;

import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.auth.refreshToken.service.RefreshTokenService;
import com.codestates.auth.utils.JwtToMemberInfoUtils;
import com.codestates.dto.SingleResponseDto;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/pp/tokens")
@RestController
public class RefreshTokenController {

    private final JwtToMemberInfoUtils jwtToMemberInfoUtils;

    private final RefreshTokenService refreshTokenService;

    public RefreshTokenController(JwtToMemberInfoUtils jwtToMemberInfoUtils, RefreshTokenService refreshTokenService) {
        this.jwtToMemberInfoUtils = jwtToMemberInfoUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping
    public ResponseEntity getReissueAccessToken (@RequestHeader HttpHeaders httpHeaders){

        String newAccessToken = refreshTokenService.reissueAccessToken(httpHeaders);

        return new ResponseEntity<>(new SingleResponseDto<>(newAccessToken), HttpStatus.OK);

    }
}