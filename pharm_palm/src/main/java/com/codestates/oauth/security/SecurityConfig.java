//package com.codestates.oauth.security;
//
//import com.codestates.oauth.service.CustomOAuth2MemberService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@RequiredArgsConstructor
//@EnableWebSecurity
//public class SecurityConfig {
//
//    private final CustomOAuth2MemberService customOAuth2MemberService;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .headers().frameOptions().disable()
//                .and()
//                .authorizeRequests()
//                .antMatchers("/","/css/**","/images/**","/js/**","/h2-console/**").permitAll()
//                .anyRequest().permitAll()
////                .antMatchers("/**").authenticated() // 인가된 사용자만 접근 가능하도록 설정
////                .antMatchers("의약품").hasRole(Role.USER.name()) // 특정 ROLE를 가진 사용자만 접근 가능하도록 설정
//                .and()
//                .logout()
//                .logoutSuccessUrl("/")
//                .and()
//                .oauth2Login()
//                .userInfoEndpoint()
//                .userService(customOAuth2MemberService);
//
//        return http.build();
//    }
//}
