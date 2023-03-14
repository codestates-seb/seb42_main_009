package com.codestates.oauth.service;

import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;

import com.codestates.oauth.attributes.OAuthAttributes;
import com.codestates.oauth.session.SessionMember;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2MemberService extends DefaultOAuth2UserService {
    private final MemberRepository memberRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();

        OAuth2User oAuth2User = service.loadUser(userRequest); // OAuth2 정보를 가져옵니다

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보를 가져옵니다

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Member member = saveOrUpdate(attributes);
        httpSession.setAttribute("user", new SessionMember(member));

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("USER")),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }

    private Member saveOrUpdate(OAuthAttributes attributes) {
        Member member = memberRepository.findByMemberEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getEmail(), attributes.getName(), attributes.getPicture(), attributes.getGender(), attributes.getAge()))
                .orElse(attributes.toEntity());

        return memberRepository.save(member);
    }
}
