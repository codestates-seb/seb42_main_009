package com.codestates.auth.reissueToken.controller;

import com.codestates.auth.reissueToken.AccessTokenValue;
import com.codestates.auth.reissueToken.service.RefreshTokenService;
import com.codestates.auth.utils.JwtToMemberInfoUtils;
import com.codestates.dto.SingleResponseDto;
import com.google.gson.Gson;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

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
    public void getReissueAccessToken (@RequestHeader HttpHeaders httpHeaders, HttpServletResponse response) throws IOException {
        Gson gson = new Gson();
        String newAccessToken = refreshTokenService.reissueAccessToken(httpHeaders);
        Date expires = refreshTokenService.tokenExpireAt();

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(new AccessTokenValue(newAccessToken, expires), AccessTokenValue.class));

    }
}