package com.codestates.review.entity;

import com.codestates.audit.Auditable;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reviewId;

    @Column(length = 200, nullable = false)
    private String reviewContent;

    @Column
    private String reviewImg;

    @Column
    private String reviewOtherMedicine;

    @Column
    private Long memberId;

    @Column
    private Long medicineId;

    @Column
    private String createdAt;

    @Column
    private String lastModifiedAt;
}
