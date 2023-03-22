package com.codestates.auth.filter;

import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.auth.refreshToken.repository.RefreshTokenRepository;
import com.codestates.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final RefreshTokenRepository refreshTokenRepository;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, RefreshTokenRepository refreshTokenRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            reissueAccessToken(request,response);
            return;
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    public String reissueAccessToken(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = request.getHeader("refreshToken");
        boolean isRefreshToken = refreshTokenRepository.existsByRefreshToken(refreshToken);
        if (refreshToken != null && isRefreshToken) {
            try {
                //토큰의 Signature를 검증하기 위한 Secret Key 얻기
                String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
                // Claims를 파싱 (파싱 할 수 있다는건 내부적으로 Signature 검증에 성공했다는 의미)
                Claims refreshTokenClaims = jwtTokenizer.getJws(refreshToken, base64EncodedSecretKey).getBody();

                // 리프레쉬 토큰 만료 체크
//                Date now = new Date();
//                Date expirationDate = refreshTokenClaims.getExpiration();
//                if (expirationDate.before(now)) {
//                    throw new Exception("Refresh token has expired");
//                }

//                // 리프레쉬 토큰에서 멤버 아이디 가져오기
//                String userId = refreshTokenClaims.getSubject();
//
//                // 액세스 토큰의 id와 리프레쉬 토큰의 id가 일치하는지 확인
//                String accessTokenUserId = verifyJws(request).get("id").toString();
//                if (!accessTokenUserId.equals(userId)) {
//                    throw new Exception("User IDs in tokens don't match");
//                }


            }
            catch (Exception ex) {
                // 리프레시 토큰 만료 혹은 id가 불일치할때
                SecurityContextHolder.clearContext();
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
//            }
        }
//        else {
//            // 전해진 리프레쉬 토큰이 없을때
//            SecurityContextHolder.clearContext();
//            response.setStatus(HttpStatus.UNAUTHORIZED.value());

        }

        // 새 액세스 토큰 생성
        return delegateNewAccessToken(request);

    }
    private String delegateNewAccessToken(HttpServletRequest request) {
        String oldAccessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Claims oldAccessTokenClaims = jwtTokenizer.getJws(oldAccessToken, base64EncodedSecretKey).getBody();

        Map<String, Object> newAccessTokenClaims =new HashMap<>();
        newAccessTokenClaims.put("id", oldAccessTokenClaims.get("id"));
        newAccessTokenClaims.put("memberName", oldAccessTokenClaims.get("memberName"));
        newAccessTokenClaims.put("memberId", oldAccessTokenClaims.get("memberId"));
        newAccessTokenClaims.put("roles", oldAccessTokenClaims.get("roles"));
        newAccessTokenClaims.put("memberGender", oldAccessTokenClaims.get("memberGender"));
        newAccessTokenClaims.put("memberAge", oldAccessTokenClaims.get("memberAge"));
        newAccessTokenClaims.put("picture", oldAccessTokenClaims.get("picture"));

        String subject = oldAccessTokenClaims.getSubject();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String newAccessToken = jwtTokenizer.generateAccessToken(newAccessTokenClaims, subject, expiration, base64EncodedSecretKey);

        return newAccessToken;

    }
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.getJws(jws, base64EncodedSecretKey).getBody();
    }
//    private Map<String, Object> verifyJws(HttpServletRequest request) {
//        String jws = request.getHeader("Authorization").replace("Bearer ", "");
//        Map<String, Object> claims = jwtTokenizer.getClaims(jws, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
//
//        return claims;
//    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("id");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


}