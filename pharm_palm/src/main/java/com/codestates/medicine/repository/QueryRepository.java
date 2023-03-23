package com.codestates.medicine.repository;

import com.codestates.dose.entity.Dose;
import com.codestates.dose.entity.QDose;
import com.codestates.medicine.entity.Medicine;
import com.codestates.medicine.entity.QMedicine;
import com.codestates.member.entity.QMember;
import com.querydsl.core.QueryFactory;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class QueryRepository {
    private final JPAQueryFactory jpaQueryFactory;


    public QueryRepository(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    public List<Medicine> findByMedicineLikeDESC() {
        QMedicine medicine = new QMedicine("medicine");
        return jpaQueryFactory.selectFrom(medicine)
                .orderBy(medicine.medicineLike.desc())
                .limit(10)
                .fetch();

    }




}
