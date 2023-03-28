package com.codestates.oauth.controller;

import com.codestates.auth.userdetails.MemberDetailsService;
import com.codestates.dto.SingleResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.member.repository.MemberRepository;
import com.codestates.oauth.model.KakaoOAuthToken;
import com.codestates.oauth.model.NaverOAuthToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

// 인증이 안된 사용자들이 출입할 수 있는 경로를 /auth/**허용
// 그냥 주소가 / 이면 index.jsp 허용
// static 이하에 있는 /js/**, /css/**, /image/** 허용

@Controller
@RequiredArgsConstructor
public class UserController {

    private final MemberRepository memberRepository;
    private final MemberMapper mapper;

    @GetMapping("/auth/joinForm") // 회원가입하는데 인증필요없으므로 /auth
    public String joinForm() {
        return "user/joinForm";
    }

    @GetMapping("/auth/loginForm")
    public String loginForm() {
        return "user/loginForm";
    }

    @GetMapping("/auth/kakao/callback")
    public @ResponseBody String kakaoCallback(String code) { // Data를 리턴해주는 컨트롤러 함수

        // POST 방식으로 key=value 데이터를 요청 (카카오쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate, 얘를 쓰면 http 요청을 편하게 할 수 있습니다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap 입니다.
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용합니다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        String myProperty = System.getenv("K_CLIENT_ID");
        params.add("client_id", myProperty);
        params.add("redirect_uri", "http://pharm-palm-deploy.s3-website.ap-northeast-2.amazonaws.com/auth/kakao/callback");
        params.add("code", code);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합칩니다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 됩니다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받습니다.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        //Gson, Json Simple, ObjectMapper ... 라이브러리 중에서 ObjectMapper 사용했습니다.
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoOAuthToken oauthTokenKakao = null;
        try {
            oauthTokenKakao = objectMapper.readValue(response.getBody(), KakaoOAuthToken.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("카카오 엑세스 토큰 : " + oauthTokenKakao.getAccess_token());

        return response.getBody();
    }

    @GetMapping("/auth/naver/callback")
    public @ResponseBody String naverCallback(String code, String state) { // Data를 리턴해주는 컨트롤러 함수

        // POST 방식으로 key=value 데이터를 요청 (네이버쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate, 얘를 쓰면 http 요청을 편하게 할 수 있습니다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap 입니다.
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용합니다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        String myKProperty = System.getenv("N_CLIENT_ID");
        String myKSProperty = System.getenv("N_CLIENT_SECRET");
        params.add("client_id", myKProperty);
        params.add("client_secret", myKSProperty);
        params.add("code", code);
        params.add("state", state);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합칩니다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 됩니다.
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받습니다.
        ResponseEntity<String> response = rt.exchange(
                "https://nid.naver.com/oauth2.0/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                naverTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        //Gson, Json Simple, ObjectMapper ... 라이브러리 중에서 ObjectMapper 사용했습니다.
        ObjectMapper objectMapper = new ObjectMapper();
        NaverOAuthToken oauthTokenNaver = null;
        try {
            oauthTokenNaver = objectMapper.readValue(response.getBody(), NaverOAuthToken.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("네이버 엑세스 토큰 : " + oauthTokenNaver.getAccess_token());

        return response.getBody();
    }

    @GetMapping("/auth/kakao/info")
    public @ResponseBody ResponseEntity kakaoToken(String token) { // Data를 리턴해주는 컨트롤러 함수
        RestTemplate rt = new RestTemplate();
        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);
        ResponseEntity<String> responseEntity = rt.exchange(
                "https://kapi.kakao.com/v2/user/me", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoProfileRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        JSONObject jsonObject = new JSONObject(responseEntity.getBody());
        JSONObject kakaoAccount = jsonObject.getJSONObject("kakao_account");
        JSONObject properties = jsonObject.getJSONObject("properties");
        Member member = new Member();
        member.setMemberEmail(kakaoAccount.getString("email"));
        member.setMemberName(properties.getString("nickname"));
        member.setPicture(properties.getString("profile_image"));
        member.setMemberGender((kakaoAccount.getString("gender").equals("male")) ? "남성" : "여성");
        member.setMemberAge(kakaoAccount.getString("age_range").replace("~", "-"));
        member.setMemberState(Member.MemberState.ACTIVE);
        member.setRoles(List.of("USER"));
        member.setOauthMember(true);
        if (!memberRepository.existsByEmail(kakaoAccount.getString("email"))) {
            memberRepository.save(member);
        } else {
            Optional<Member> alreadyMember = memberRepository.findByMemberEmail(kakaoAccount.getString("email"));
            System.out.println("성공적으로 로그인이 완료되었습니다!");
            return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(
                    alreadyMember.get())), HttpStatus.OK);
        }
        Optional<Member> signMember = memberRepository.findByMemberEmail(kakaoAccount.getString("email"));
        System.out.println("성공적으로 회원가입이 완료되었습니다!");
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(
                signMember.get())), HttpStatus.CREATED);
    }

    @GetMapping("/auth/naver/info")
    public @ResponseBody ResponseEntity naverToken(String token) { // Data를 리턴해주는 컨트롤러 함수
        RestTemplate rt = new RestTemplate();
        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> naverProfileRequest = new HttpEntity<>(headers);
        ResponseEntity<String> responseEntity = rt.exchange(
                "https://openapi.naver.com/v1/nid/me", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                naverProfileRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        JSONObject jsonObject = new JSONObject(responseEntity.getBody());
        JSONObject response = jsonObject.getJSONObject("response");
        Member member = new Member();
        member.setMemberEmail(response.getString("email"));
        member.setMemberName(response.getString("name"));
        member.setPicture(response.getString("profile_image"));
        member.setMemberGender((response.getString("gender").equals("M")) ? "남성" : "여성");
        member.setMemberAge(response.getString("age"));
        member.setMemberState(Member.MemberState.ACTIVE);
        member.setRoles(List.of("USER"));
        member.setOauthMember(true);
        if (!memberRepository.existsByEmail(response.getString("email"))) {
            memberRepository.save(member);
        } else {
            Optional<Member> alreadyMember = memberRepository.findByMemberEmail(response.getString("email"));
            System.out.println("성공적으로 로그인이 완료되었습니다!");
            return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(
                    alreadyMember.get())), HttpStatus.OK);
        }
        Optional<Member> signMember = memberRepository.findByMemberEmail(response.getString("email"));
        System.out.println("성공적으로 회원가입이 완료되었습니다!");
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(
                signMember.get())), HttpStatus.CREATED);
    }

    @GetMapping("/user/updateForm")
    public String updateForm(@AuthenticationPrincipal MemberDetailsService principal) {
        return "user/updateForm";
    }

}