package com.codestates.auth.logout.service;

import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.codestates.member.service.MemberService;
import org.springframework.stereotype.Service;

@Service
public class LogoutService {
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public LogoutService(MemberRepository memberRepository, MemberService memberService) {
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    public void deleteRefresh(Long memberId) {

        Member findMember = memberService.findMember(memberId);
        findMember.setRefreshToken(null);
        memberRepository.save(findMember);
    }


}
