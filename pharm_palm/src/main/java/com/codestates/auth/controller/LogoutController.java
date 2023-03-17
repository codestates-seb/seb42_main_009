package com.codestates.auth.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/pp/logout")
@Slf4j
public class LogoutController {

    @GetMapping
    public String logout (HttpServletRequest request) throws Exception {
        return null;
    }
}
