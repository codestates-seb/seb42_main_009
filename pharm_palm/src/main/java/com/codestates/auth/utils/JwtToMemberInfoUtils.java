package com.codestates.auth.utils;


import com.codestates.auth.dto.ClaimsToMember;
import com.codestates.auth.jwt.JwtTokenizer;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import io.jsonwebtoken.Claims;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtToMemberInfoUtils {
    private final JwtTokenizer tokenizer;

    public JwtToMemberInfoUtils(JwtTokenizer tokenizer) {
        this.tokenizer = tokenizer;
    }

    public ClaimsToMember parseClaimsToUserInfo(String token) {
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey()));
        ClaimsToMember memberInfo = ClaimsToMember.builder()
                .id((String) claims.get("id"))
                .memberId(claims.get("memberId"))
                .memberName((String) claims.get("memberName"))
                .memberAge((String) claims.get("memberAge"))
                .memberGender((String) claims.get("memberGender"))
                .picture((String) claims.get("picture"))
                .build();

        return memberInfo;
    }

    private void verifiedAppropriateMember(Object tryId, long memberId) {
        if ((Integer) tryId == memberId) {
            return;
        }
        throw new BusinessLogicException(ExceptionCode.WRONG_TOKEN_INPUT);
    }
}