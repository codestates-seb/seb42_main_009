package com.codestates.auth.refreshToken.service;


import com.codestates.auth.filter.JwtAuthenticationFilter;
import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.auth.refreshToken.entity.RefreshToken;
import com.codestates.auth.refreshToken.repository.RefreshTokenRepository;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    private final JwtTokenizer jwtTokenizer;

    private final MemberService memberService;



    public String reissueAccessToken (HttpHeaders httpHeaders){
        String refreshToken = httpHeaders.get("Refresh").get(0);
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Claims refreshTokenClaims = jwtTokenizer.getJws(refreshToken, base64EncodedSecretKey).getBody();
        return delegateNewAccessToken(refreshTokenClaims);
    }
    private String delegateNewAccessToken(Claims refreshToken){
        String tokenId = (String) refreshToken.get("id");
        Member member = memberService.findVerifiedMemberEmail(tokenId);
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

    private Map<String, Object> verifyJws(HttpHeaders httpHeaders) {
        String jws = httpHeaders.get("Authorization").get(0).replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getJws(jws, base64EncodedSecretKey).getBody();

        return claims;
    }



}

