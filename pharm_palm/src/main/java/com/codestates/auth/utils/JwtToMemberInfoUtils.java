package com.codestates.auth.utils;

import com.codestates.auth.dto.ClaimsToMember;
import com.codestates.auth.jwt.JwtTokenizer;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JwtToMemberInfoUtils {
    private final JwtTokenizer tokenizer;

    public JwtToMemberInfoUtils(JwtTokenizer tokenizer) {
        this.tokenizer = tokenizer;
    }

    public ClaimsToMember parseClaimsToUserInfo(String token){
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey())).getBody();

        ClaimsToMember memberInfo = ClaimsToMember.builder()
                .id((String) claims.get("id"))
                .memberId( claims.get("memberId"))
                .memberName((String) claims.get("memberName")).build();

        return memberInfo;
    }

    public ClaimsToMember parseClaimsToMemberInfo(String token, long memberId){
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                 tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey())).getBody();

        ClaimsToMember memberInfo = ClaimsToMember.builder()
                .id((String) claims.get("id"))
                .memberId( claims.get("memberId"))
                .memberName((String) claims.get("memberName")).build();

        verifiedAppropriateMember(memberInfo.getMemberId(), memberId);

        return memberInfo;
    }

    private void verifiedAppropriateMember (Object tryId,long memberId){
        if((Integer)tryId == memberId){
            return;
        }
        throw new BusinessLogicException(ExceptionCode.WRONG_TOKEN_INPUT);
    }

}
