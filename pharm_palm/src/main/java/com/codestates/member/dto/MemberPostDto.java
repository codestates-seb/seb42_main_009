package com.codestates.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class MemberPostDto {
    @NotBlank
    @Email
    private String memberEmail;
    @NotBlank(message = "이름을 작성해 주세요.")
    private String memberName;
    @NotBlank(message = "비밀번호를 작성해 주세요.")
    private String memberPwd;
    private String memberGender;
    private String memberAge;

}
