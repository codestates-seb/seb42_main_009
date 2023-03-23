package com.codestates.review.entity;

import com.codestates.audit.Auditable;

import com.codestates.member.entity.Member;

import com.codestates.disease.entity.Disease;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column
    private String createdAt;

    @Column
    private String lastModifiedAt;

    @OneToMany(cascade = CascadeType.DETACH)
    private List<Disease> diseases;
}
