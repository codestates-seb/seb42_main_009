//package com.codestates.medicine.repository;
//
//import com.codestates.dose.entity.Dose;
//import com.codestates.dose.entity.QDose;
//import com.codestates.medicine.entity.Medicine;
//import com.codestates.medicine.entity.QMedicine;
//import com.codestates.member.entity.QMember;
//import com.querydsl.core.QueryFactory;
//import com.querydsl.core.Tuple;
//import com.querydsl.core.types.dsl.BooleanExpression;
//import com.querydsl.jpa.JPAExpressions;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Repository
//public class QueryRepository {
//    private final JPAQueryFactory jpaQueryFactory;
//
//
//    public QueryRepository(JPAQueryFactory jpaQueryFactory) {
//        this.jpaQueryFactory = jpaQueryFactory;
//    }
//
//
//    public List<Medicine> findByMedicineLikeDESC() {
//        QMedicine medicine = new QMedicine("medicine");
//        return jpaQueryFactory.selectFrom(medicine)g
//                .orderBy(medicine.medicineLike.desc())
//                .limit(10)
//                .fetch();
//
//    }
////    public List<Object[]> findDoseByGenderDESC() {
////        QDose dose = QDose.dose;
////        QMember member = QMember.member;
////        QMedicine medicine = QMedicine.medicine;
////
////        BooleanExpression genderMale = member.memberGender.eq("male");
////        List<Tuple> result = jpaQueryFactory
////                .select(dose.medicine.medicineId, dose.count())
////                .from(dose)
////                .where(dose.member.memberId.in(
////                        JPAExpressions
////                                .select(member.memberId)
////                                .from(member)
////                                .where(genderMale)
////                ))
////                .groupBy(dose.medicine.medicineId)
////                .orderBy(dose.count().desc())
////                .limit(10)
////                .fetch();
////
////        return jpaQueryFactory
////                .select(medicine.medicineName, dose.count())
////                .from(medicine)
////                .leftJoin(dose).on(medicine.medicineId.eq(dose.medicine.medicineId))
////                .where(medicine.medicineId.in(
////                        result.stream()
////                                .map(tuple -> tuple.get(dose.medicine.medicineId))
////                                .collect(Collectors.toList())))
////                .orderBy(dose.count().desc())
////                .fetch();
////    }
//
//
//
//}
