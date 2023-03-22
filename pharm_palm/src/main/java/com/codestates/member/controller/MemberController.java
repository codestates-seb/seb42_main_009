package com.codestates.member.controller;

import com.codestates.auth.dto.ClaimsToMember;
import com.codestates.auth.utils.JwtToMemberInfoUtils;
import com.codestates.dto.SingleResponseDto;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.member.service.MemberService;
import com.codestates.utils.UriCreator;

import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pp/members")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/pp/members";
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final JwtToMemberInfoUtils jwtToMemberInfoUtils;

    public MemberController(MemberService memberService, MemberMapper mapper, JwtToMemberInfoUtils jwtToMemberInfoUtils) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.jwtToMemberInfoUtils = jwtToMemberInfoUtils;
    }

//    @GetMapping("/info")
//    public ResponseEntity getMemberInfo(@RequestHeader HttpHeaders httpHeaders) {
//        String token  = httpHeaders.get("Authorization").get(0);
//
////        try{
////            token = httpHeaders.get("Authorization").get(0);
////        }catch (NullPointerException exception){
////            throw new MalformedJwtException("");
////        }
//        ClaimsToMember memberInfo = jwtToMemberInfoUtils.parseClaimsToUserInfo(token);
//        return new ResponseEntity<>(new SingleResponseDto<>(memberInfo), HttpStatus.OK);
//    }
    @GetMapping("/info")
    public ResponseEntity getMemberInfo(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        ClaimsToMember memberInfo = jwtToMemberInfoUtils.parseClaimsToUserInfo(token);
        return new ResponseEntity<>(new SingleResponseDto<>(memberInfo), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setRoles(List.of("USER"));
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

//    @PatchMapping("/{member-id}")
//    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
//                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {
//
//        memberPatchDto.setMemberId(memberId);
//        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
//    }

    @PatchMapping("/info")
    public ResponseEntity patchMemberInfo(Authentication authentication,
                                          @Valid @RequestBody MemberPatchDto memberPatchDto) {
        if (authentication == null) {
            throw new BadCredentialsException("회원 정보를 찾을 수 없습니다.");
        }
        memberPatchDto.setMemberEmail(authentication.getName());
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
    }

    @GetMapping("{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
    }
    
    @GetMapping("/doses/{member-id}")
    public ResponseEntity getDoses(@PathVariable("member-id") @Positive long memberId) {

        MemberResponseDto memberResponseDto = mapper.memberToMemberResponseDto( memberService.findMember(memberId));

        return new ResponseEntity(
                new SingleResponseDto<>(memberResponseDto), HttpStatus.OK);
    }
    


//    @GetMapping("/mypage")
//    public ResponseEntity getMemberInfo(Authentication authentication) {
//        if (authentication == null) {
//            throw new BadCredentialsException("회원 정보를 찾을 수 없습니다.");
//        }
//        Member member = memberService.findMemberInfo(authentication.getName());
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
//    }



//    @GetMapping
//    public ResponseEntity getMembers(@Positive @RequestParam int page,
//                                     @Positive @RequestParam int size) {
//        Page<Member> pageMembers = memberService.findMembers(page -1, size);
//        List<Member> members = pageMembers.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(
//                        mapper.membersToMemberResponseDto(members), pageMembers), HttpStatus.OK);
//                        mapper.membersToMemberResponseDtos(members), pageMembers), HttpStatus.OK);
//    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/info")
    public ResponseEntity withdrawMember(Authentication authentication) {
        if (authentication == null) {
            throw new BadCredentialsException("회원 정보를 찾을 수 없습니다.");
        }
        memberService.withdrawMember(authentication.getName());

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
