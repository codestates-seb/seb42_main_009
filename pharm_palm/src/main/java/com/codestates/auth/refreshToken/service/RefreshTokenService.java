package com.codestates.auth.refreshToken.service;

import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.auth.refreshToken.entity.RefreshToken;
import com.codestates.auth.refreshToken.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//@Service
//public class RefreshTokenService {
//    private final RefreshTokenRepository refreshTokenRepository;
//
//    private final JwtTokenizer jwtTokenizer;
//
//    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, JwtTokenizer jwtTokenizer) {
//        this.refreshTokenRepository = refreshTokenRepository;
//        this.jwtTokenizer = jwtTokenizer;
//    }
//
//    public String reissueAccessToken (HttpHeaders httpHeaders) {
//
//        String accessToken;
//        try{
//            accessToken = httpHeaders.get("Authorization").get(0);
//        }catch (NullPointerException exception){
//            throw new MalformedJwtException("Access토큰의 형식이 올바르지 않습니다.");
//        }
//
//        String refreshToken;
//        try{
//            refreshToken = httpHeaders.get("Refresh").get(0);
//        }catch (NullPointerException exception){
//            throw new MalformedJwtException("Refresh토큰의 형식이 올바르지 않습니다.");
//        }
//
//        boolean isRefreshToken = refreshTokenRepository.existsByRefreshToken(refreshToken);
//        if (refreshToken != null && isRefreshToken) {
//            try {
//                //토큰의 Signature를 검증하기 위한 Secret Key 얻기
//                String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//                // Claims를 파싱 (파싱 할 수 있다는건 내부적으로 Signature 검증에 성공했다는 의미)
//                Claims refreshTokenClaims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();
//
//                // 리프레쉬 토큰 만료 체크
////                Date now = new Date();
////                Date expirationDate = refreshTokenClaims.getExpiration();
////                if (expirationDate.before(now)) {
////                    throw new Exception("Refresh token has expired");
////                }
//
//                // 리프레쉬 토큰에서 멤버 아이디 가져오기
//                String userId = refreshTokenClaims.getSubject();
//
//                // 액세스 토큰의 id와 리프레쉬 토큰의 id가 일치하는지 확인
//                String accessTokenUserId = verifyJws(httpHeaders).get("id").toString();
//                if (!accessTokenUserId.equals(userId)) {
//                    throw new Exception("User IDs in tokens don't match");
//                }
//
//            } catch (Exception ex) {
//                // 리프레시 토큰 만료 혹은 id가 불일치할때
//                SecurityContextHolder.clearContext();
//                response.setStatus(HttpStatus.UNAUTHORIZED.value());
//            }
//        }
//        // 새 액세스 토큰 생성
//        return delegateNewAccessToken(httpHeaders);
//    }
//    private String delegateNewAccessToken(HttpHeaders httpHeaders) {
//        String oldAccessToken = httpHeaders.get("Authorization").get(0).replace("Bearer ", "");
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//        Claims oldAccessTokenClaims = jwtTokenizer.getClaims(oldAccessToken, base64EncodedSecretKey).getBody();
//
//        Map<String, Object> newAccessTokenClaims =new HashMap<>();
//        newAccessTokenClaims.put("id", oldAccessTokenClaims.get("id"));
//        newAccessTokenClaims.put("memberName", oldAccessTokenClaims.get("memberName"));
//        newAccessTokenClaims.put("memberId", oldAccessTokenClaims.get("memberId"));
//        newAccessTokenClaims.put("roles", oldAccessTokenClaims.get("roles"));
//
//        String subject = oldAccessTokenClaims.getSubject();
//
//        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
//
//        String newAccessToken = jwtTokenizer.generateAccessToken(newAccessTokenClaims, subject, expiration, base64EncodedSecretKey);
//
//        return newAccessToken;
//
//    }
//    private Map<String, Object> verifyJws(HttpHeaders httpHeaders) {
//        String jws = httpHeaders.get("Authorization").get(0).replace("Bearer ", "");
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
//
//        return claims;
//    }
//
//
//
//}
