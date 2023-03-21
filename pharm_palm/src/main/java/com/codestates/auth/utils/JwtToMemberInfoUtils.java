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
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey()));

        ClaimsToMember memberInfo = ClaimsToMember.builder()
                .id((String) claims.get("id"))
                .memberId( claims.get("memberId"))
                .memberName((String) claims.get("memberName")).build();

        return memberInfo;
    }

    public ClaimsToMember parseClaimsToUserInfo(String token, long memberId){
        token = token.replace("Bearer ", "");
        Map<String, Object> claims =
                tokenizer.getClaims(token, tokenizer.encodeBase64SecretKey(tokenizer.getSecretKey()));

        ClaimsToMember memberInfo = ClaimsToMember.builder()
                .id((String) claims.get("id"))
                .memberId( claims.get("memberId"))
                .memberName((String) claims.get("displayName")).build();

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

//@Component
//public class JwtToMemberInfoUtils {
//
//    private final JwtTokenizer jwtTokenizer;
//
//    public JwtToMemberInfoUtils(JwtTokenizer jwtTokenizer) {
//        this.jwtTokenizer = jwtTokenizer;
//    }
//
//    public ClaimsToMember parseClaimsToUserInfo(String token){
//        token = token.replace("Bearer ", "");
//        Map<String, Object> claims =
//                jwtTokenizer.getClaims(token, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
//
//        ClaimsToMember memberInfo = ClaimsToMember.builder()
//                .id((String) claims.get("id"))
//                .memberId( claims.get("memberId"))
//                .memberName((String) claims.get("memberName")).build();
//
//        return memberInfo;
//    }

//    public Long extractMemberIdFromToken(String token) {
//        token = token.replace("Bearer ", "");
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        Claims claims = jwtTokenizer.getClaims(token, base64EncodedSecretKey).getBody();
//
//        Long memberId = claims.get("memberId", Long.class);
//
//        return memberId;
//    }

//}
