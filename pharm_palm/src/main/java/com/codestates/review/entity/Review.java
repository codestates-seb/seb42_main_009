package com.codestates.review.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(length = 200, nullable = false)
    private String reviewContent;

    @Column
    private String reviewImg;

    @Column
    private String reviewOtherMedicine;

    @Column
    private Long memberId;
}
