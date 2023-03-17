package com.codestates.medicine.entity;

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
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicineId;

    @Column(length = 100, nullable = false)
    private String medicineName;

    @Column(length = 500, nullable = false)
    private String medicineIngredient;

    @Column(length = 2000, nullable = false)
    private String medicineUse;

    @Column(columnDefinition = "BIGINT default 0")
    private Long medicineLike;

    @Column
    private String medicineImg;

    @Column(length = 2000, nullable = false)
    private String medicineWarn;
    @Column
    private String medicineEntp;
    @Column(length = 2000, nullable = false)
    private String medicineDeposit;

    //매핑 oneToMany
    //private Long reviewId
}
