package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class MemberPatchDto {
    private long memberId;
    @NotBlank(message = "이름을 작성해 주세요.")
    private String memberName;
    @NotBlank(message = "비밀번호를 작성해 주세요.")
    private String memberPwd;
    private String memberGender;
    private Integer memberAge;
    private Member.MemberState memberState;

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }
}