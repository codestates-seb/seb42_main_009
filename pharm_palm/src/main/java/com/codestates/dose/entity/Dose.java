package com.codestates.dose.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Dose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doseId;

    @Column
    private Long memberId;

    @Column
    private Long medicine_id;

    @Column
    private int doseMount;

    @Column
    private int doseNumber;

    @Column
    private int doseTime;
}
