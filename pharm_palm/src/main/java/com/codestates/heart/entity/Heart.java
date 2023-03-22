package com.codestates.heart.entity;

import com.codestates.medicine.entity.Medicine;
import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Entity
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long heartId;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name="medicine_id")
    private Medicine medicine;
}
