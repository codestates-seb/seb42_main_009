package com.codestates.dose.entity;

import com.codestates.medicine.entity.Medicine;
import com.codestates.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Dose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doseId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false )
    private Medicine medicine;

    private String medicineName;
    @Column(nullable = false)
    private int doseNumber;
    @Column(nullable = false)
    private String doseMount; // ex) 2정, 3포

    private String doseTimes;


    public void addMember(Member member) {
        this.member = member;
        if (!this.member.getDoses().contains(this)) {
            this.member.getDoses().add(this);
        }
    }

    public void addMedicine(Medicine medicine) {
        this.medicine = medicine;
        if (!this.medicine.getDoses().contains(this)) {
            this.medicine.addDose(this);
        }
    }

    public Dose(Long doseId, Medicine medicine, Member member) {
        this.doseId = doseId;
        this.medicine = medicine;
        this.member = member;
    }
}
