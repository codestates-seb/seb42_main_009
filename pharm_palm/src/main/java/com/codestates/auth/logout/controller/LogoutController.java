package com.codestates.auth.logout.controller;

import com.codestates.auth.logout.service.LogoutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/pp/logout")
@Slf4j
public class LogoutController {
    private final LogoutService logoutService;

    public LogoutController(LogoutService logoutService) {
        this.logoutService = logoutService;
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity logout(@PathVariable("member-id") @Positive long memberId) {

        logoutService.deleteRefresh(memberId);
        log.info("# 로그아웃 완료.");

        return ResponseEntity.noContent().build();
    }
}
