package com.codestates.medicine.entity;

import com.codestates.dose.entity.Dose;
import com.codestates.review.entity.Review;
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
    @Column
    private String medicineDeposit;


    @OneToMany(mappedBy = "medicine")
    private List<Dose> doses = new ArrayList<Dose>();

    public void addDose(Dose dose) {
        this.doses.add(dose);
        if (dose.getMedicine() != this) {
            dose.addMedicine(this);
        }
    }

    public Medicine(Long medicineId, String medicineName) {
        this.medicineId = medicineId;
        this.medicineName = medicineName;
    }


    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Review> review;

    public void addReview(Review review) {
        this.review.add(review);
    }
}
