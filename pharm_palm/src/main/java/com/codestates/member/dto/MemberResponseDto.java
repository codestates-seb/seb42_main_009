package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String memberEmail;
    private String memberName;
//    private String memberPwd; reponse에 pwd가 필요한가?
    private Member.MemberGender memberGender;
    private Integer memberAge;
    private Member.MemberState memberState;
}
