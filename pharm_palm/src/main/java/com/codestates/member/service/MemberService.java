package com.codestates.member.service;


import com.codestates.auth.utils.CustomAuthorityUtils;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.codestates.s3.uploader.S3Uploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final S3Uploader s3Uploader;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, S3Uploader s3Uploader) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.s3Uploader = s3Uploader;
    }

    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberEmail());

        String encryptedPassword = passwordEncoder.encode(member.getMemberPwd());
        member.setMemberPwd(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getMemberEmail());
        member.setRoles(roles);

        member.setOauthMember(false);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMemberId(member.getMemberId());

        if(findMember.getOauthMember().equals(true)) {
            throw new IllegalStateException("소셜 로그인 사용자는 사용자 정보를 수정 할 수 없습니다.");
        }

        Optional.ofNullable(member.getMemberName())
                .ifPresent(findMember::setMemberName);

        Optional.ofNullable(member.getMemberGender())
                .ifPresent(findMember::setMemberGender);

        Optional.ofNullable(member.getMemberAge())
                .ifPresent(findMember::setMemberAge);

        return memberRepository.save(findMember);
    }

    public Member updateAlarm(Member member) {
        Member findMember = findVerifiedMemberId(member.getMemberId());
        Optional.ofNullable(member.isAlarm())
                .ifPresent(findMember::setAlarm);
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

    @Transactional
    public Member imageMember(MultipartFile image, Long memberId) throws IOException {
        System.out.println("Member service saveMember");
        Member member = memberRepository.findByMemberId(memberId);
        if (member.getOauthMember().equals(true)) {
            throw new IllegalStateException("소셜 로그인 사용자는 프로필 이미지를 변경할 수 없습니다.");
        }
        if (!image.isEmpty()) {
            String storedFileName = s3Uploader.upload(image, "memberImages");
            member.setPicture(storedFileName);
        }

        return  memberRepository.save(member);
    }

    public void passwordCheck(Member member) {
        Member findMember = findVerifiedMemberId(member.getMemberId());
        if(findMember.getOauthMember().equals(true)) {
            throw new IllegalStateException("소셜 로그인 사용자는 사용자 정보를 수정 할 수 없습니다.");
        }
        Member checkMember = memberRepository.findByMemberId(member.getMemberId());
        String inputPassword = member.getMemberPwd();
        boolean isMatched = passwordEncoder.matches(inputPassword, checkMember.getMemberPwd());
        if (!isMatched){
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_MATCH);
        }
    }

    public void savePassword(Member member) {
        Member findMember = findVerifiedMemberId(member.getMemberId());
        if(findMember.getOauthMember().equals(true)) {
            throw new IllegalStateException("소셜 로그인 사용자는 사용자 정보를 수정 할 수 없습니다.");
        }
        Member checkMember = memberRepository.findByMemberId(member.getMemberId());

        String encryptedPassword = passwordEncoder.encode(member.getMemberPwd());
        Optional.ofNullable(member.getMemberPwd()).ifPresent(memberPwd -> checkMember.setMemberPwd(encryptedPassword));

        memberRepository.save(checkMember);
    }

    public void withdrawMember(Long memberId) {
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

    public Member findVerifiedMemberEmail(String memberEmail) {
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberEmail);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}
