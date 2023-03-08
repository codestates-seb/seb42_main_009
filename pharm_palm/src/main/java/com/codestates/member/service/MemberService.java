package com.codestates.member.service;


import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberEmail());

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMemberId(member.getMemberId());

        Optional.ofNullable(member.getMemberName())
                .ifPresent(findMember::setMemberName);

        Optional.ofNullable(member.getMemberGender())
                .ifPresent(findMember::setMemberGender);

        Optional.ofNullable(member.getMemberAge())
                .ifPresent(findMember::setMemberAge);

        Optional.ofNullable(member.getMemberState())
                .ifPresent(findMember::setMemberState);

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMemberId(memberId);
    }

    public Member findMemberInfo(String memberEmail) {
        return findVerifiedMemberEmail(memberEmail);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMemberId(memberId);
        findMember.setMemberState(Member.MemberState.WITHDRAW);
        memberRepository.save(findMember);
    }

    private void verifyExistsEmail(String memberEmail) {
        Optional<Member> member = memberRepository.findByMemberEmail(memberEmail);
        if (member.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
    private Member findVerifiedMemberId(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private Member findVerifiedMemberEmail(String memberEmail) {
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberEmail);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}
