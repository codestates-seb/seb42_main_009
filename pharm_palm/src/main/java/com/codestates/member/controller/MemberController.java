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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
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

    @PostMapping("/info")
    public ResponseEntity getMemberInfo(@RequestHeader HttpHeaders httpHeaders) {
        String token;

        try{
            token = httpHeaders.get("Authorization").get(0);
        }catch (NullPointerException exception){

            throw new MalformedJwtException("");
        }
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

    @PostMapping("/password/{member-id}")
    public ResponseEntity checkPassword(@PathVariable("member-id") @Positive long memberId,
                                        @Valid @RequestBody MemberPatchDto memberPatchDto) {
        memberPatchDto.setMemberId(memberId);
        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        memberService.passwordCheck(member);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PatchMapping("/password/{member-id}")
    public ResponseEntity patchPassword(@PathVariable("member-id") @Positive long memberId,
                                        @Valid @RequestBody MemberPatchDto memberPatchDto) {
        memberPatchDto.setMemberId(memberId);
        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        memberService.savePassword(member);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {

        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
    }

    @PatchMapping("/alarm/{member-id}")
    public ResponseEntity patchAlarm(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {

        memberPatchDto.setMemberId(memberId);
        Member member = memberService.updateAlarm(mapper.memberPatchDtoToMember(memberPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)), HttpStatus.OK);
    }


    @PatchMapping(value="/image/{member-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity saveImage(@RequestParam(value="memberImage") MultipartFile image,
                                    @PathVariable("member-id") @Positive long memberId) throws IOException {
        System.out.println("MemberController.saveImage");
        System.out.println(image);
        System.out.println(memberId);
        Member member = memberService.imageMember(image, memberId);
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

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/withdraw/{member-id}")
    public ResponseEntity withdrawMember(@PathVariable("member-id") @Positive long memberId) {

        memberService.withdrawMember(memberId);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
