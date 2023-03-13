package com.codestates.oauth.session;

import com.codestates.member.entity.Member;
import lombok.Getter;

@Getter
public class SessionMember {
    private String name;
    private String email;
    private String picture;

    public SessionMember(Member member) {
        this.name = member.getMemberName();
        this.email = member.getMemberEmail();
        this.picture = member.getPicture();
    }
}
