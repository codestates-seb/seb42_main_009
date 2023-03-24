package com.codestates.member.entity;

import com.codestates.audit.Auditable;
import com.codestates.dose.entity.Dose;
import com.codestates.review.entity.Review;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 25, nullable = false, updatable = false, unique = true)
    private String memberEmail;

    @Column(length = 16, nullable = false)
    private String memberName;

    @Column
    private String picture;

    @Column(length = 100)
    private String memberPwd;

    @Column(length = 10, nullable = false)
    private String memberGender;

    @Column(length = 10, nullable = false)
    private String memberAge;

    @Enumerated(EnumType.STRING)
    private MemberState memberState = MemberState.ACTIVE;

    @Column
    private boolean alarm;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Dose> doses = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Review> reviews;

    public void addReview(Review review) {
        this.reviews.add(review);
    }

    public void addDose(Dose dose) {
        this.doses.add(dose);
        if (dose.getMember() != this) {
            dose.addMember(this);
        }
    }

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column
    private Boolean oauthMember;

    public enum MemberState {
        ACTIVE("활동중"),
        INACTIVE("휴면"),
        WITHDRAW("탈퇴")
        ;
        @Getter
        private String state;

        MemberState(String state) {
            this.state = state;
        }
    }

}