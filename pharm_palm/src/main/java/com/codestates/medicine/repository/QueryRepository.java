package com.codestates.medicine.repository;

import com.codestates.medicine.entity.Medicine;
import com.codestates.medicine.entity.QMedicine;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

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
