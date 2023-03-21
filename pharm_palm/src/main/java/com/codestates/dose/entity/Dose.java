package com.codestates.dose.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Time;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Dose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doseId;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String medicineName;

    @Column(nullable = false)
    private int doseMount;

    @Column(nullable = false)
    private int doseNumber;

    @Column
    private String doseTime;
}
