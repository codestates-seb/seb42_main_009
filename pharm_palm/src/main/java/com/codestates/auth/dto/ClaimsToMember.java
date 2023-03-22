package com.codestates.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ClaimsToMember {
    private String memberName;
    private String id;
    private Object memberId;
    private String picture;
    private String memberGender;
    private String memberAge;
}