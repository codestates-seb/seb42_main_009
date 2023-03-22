package com.codestates.auth.controller;

import com.codestates.auth.refreshToken.repository.RefreshTokenRepository;
import com.codestates.auth.refreshToken.service.RefreshTokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/pp/logout")
@Slf4j
public class LogoutController {
    @PostMapping
    public ResponseEntity logout () throws Exception {
        log.info("# 사용자가 로그아웃 했습니다.");

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
