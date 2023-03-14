package com.codestates.member.service;


import com.codestates.auth.utils.CustomAuthorityUtils;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberEmail());

        String encryptedPassword = passwordEncoder.encode(member.getMemberPwd());
        member.setMemberPwd(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getMemberEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMemberEmail(member.getMemberEmail());

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

        memberRepository.delete(findMember);
    }

    public void withdrawMember(String memberEmail) {
        Member findMember = findVerifiedMemberEmail(memberEmail);
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
