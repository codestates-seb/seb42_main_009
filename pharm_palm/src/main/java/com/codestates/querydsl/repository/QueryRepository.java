package com.codestates.querydsl.repository;

import com.codestates.dose.dto.ChartResponseDto;
import com.codestates.dose.entity.Dose;
import com.codestates.dose.entity.QDose;
import com.codestates.dose.repository.DoseRepository;
import com.codestates.medicine.dto.MedicineLikeResponseDto;
import com.codestates.medicine.entity.Medicine;
import com.codestates.medicine.entity.QMedicine;
import com.codestates.member.entity.QMember;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;
import static org.springframework.data.domain.Sort.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class QueryRepository {
    private final JPAQueryFactory jpaQueryFactory;



    public QueryRepository(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    public List<MedicineLikeResponseDto> findByMedicineLikeDESC() {
        QMedicine medicine = new QMedicine("medicine");
        return jpaQueryFactory.select(Projections.bean(MedicineLikeResponseDto.class,
                        medicine.medicineLike,medicine.medicineName))
                .from(medicine)
                .orderBy(medicine.medicineLike.desc())
                .limit(10)
                .fetch();

    }
    public  List<ChartResponseDto> findByDoseGender(String gender) {
        QMember member = QMember.member;
        QDose dose = QDose.dose;

       return   jpaQueryFactory.select(Projections.bean(ChartResponseDto.class,
                       dose.medicine.medicineName,member.memberGender,dose.medicine.medicineId.count().as("count")))
                .from(dose)
                .innerJoin(dose.member, member)
                .where(member.memberGender.eq(gender))
                .groupBy(dose.medicine.medicineId)
                .orderBy(dose.medicine.medicineId.count().desc())
                .limit(10)
                .fetch();

    }



}
