package com.codestates.review.entity;

import com.codestates.audit.Auditable;

import com.codestates.medicine.entity.Medicine;
import com.codestates.member.entity.Member;

import com.codestates.disease.entity.Disease;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reviewId;

    @Column(length = 200, nullable = false)
    private String reviewContent;

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> reviewImg;

    @Column
    private Long memberId;

    @Column
    private String memberName;

    @Column
    private String memberImg;

    @Column
    private Long medicineId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Medicine medicine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Column
    private String createdAt;

    @Column
    private String lastModifiedAt;

    @OneToMany(cascade = CascadeType.DETACH)
    private List<Disease> diseases;
}
