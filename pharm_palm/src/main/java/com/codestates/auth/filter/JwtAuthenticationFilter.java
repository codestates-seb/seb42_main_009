package com.codestates.auth.filter;

import com.codestates.auth.dto.JwtConvertor;
import com.codestates.auth.dto.LoginDto;
import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.SneakyThrows;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    private final MemberRepository memberRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getId(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        Member findMember = memberRepository.findByMemberEmail(member.getMemberEmail()).get();

        String accessToken = delegateAccessToken(findMember);
        String refreshToken = delegateRefreshToken(findMember);
        Date accessTokenExpiresAt = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        Date refreshTokenExpiresAt = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        sendJwtToken(response, accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", member.getMemberEmail());
        claims.put("memberName", member.getMemberName());
        claims.put("memberId", member.getMemberId());
        claims.put("roles", member.getRoles());
        claims.put("memberGender", member.getMemberGender());
        claims.put("memberAge", member.getMemberAge());
        claims.put("picture", member.getPicture());

        String subject = member.getMemberEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", member.getMemberEmail());
        String subject = member.getMemberEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateToken(claims, subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
    private void sendJwtToken(HttpServletResponse response,
                              String accessToken,
                              String refreshToken,
                              Date accessTokenExpiresAt, Date refreshTokenExpiresAt) throws IOException {

        Gson gson = new Gson();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(new JwtConvertor(accessToken, refreshToken,
                accessTokenExpiresAt, refreshTokenExpiresAt), JwtConvertor.class));

    }
}