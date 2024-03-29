package com.codestates.auth.filter;

import com.codestates.auth.dto.JwtConvertor;
import com.codestates.auth.dto.LoginDto;
import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
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

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        Member findMember = memberRepository.findByMemberEmail(loginDto.getId()).get();

        if(findMember.getMemberState() == Member.MemberState.WITHDRAW){
            response.getWriter().write("탈퇴한 회원 입니다");
            throw new BusinessLogicException(ExceptionCode.WITHDRAW_MEMBER);
        }

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

        Date accessToken_expiresAt = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        Date refreshToken_expiresAt = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        sendJwtToken(response, accessToken, refreshToken, accessToken_expiresAt, refreshToken_expiresAt);

        findMember.setRefreshToken(refreshToken);
        memberRepository.save(findMember);

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