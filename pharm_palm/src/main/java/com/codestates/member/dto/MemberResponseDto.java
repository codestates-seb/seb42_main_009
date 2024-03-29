package com.codestates.member.dto;

import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.review.dto.ReviewResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String memberEmail;
    private String memberName;
    private String memberGender;
    private String memberAge;
    private String picture;
    private Boolean oauthMember;
    private Member.MemberState memberState;
    private boolean alarm;
    private List<DoseResponseDto> doses;
    private List<ReviewResponseDto> review;
}