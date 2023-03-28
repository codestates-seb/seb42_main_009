package com.codestates.review.repository;

import com.codestates.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT r FROM Review r WHERE r.medicine.medicineId = :medicineId")
    Page<Review> findAllByMedicineId(@Param("medicineId") Long medicineId, Pageable pageable);

    @Query("SELECT r FROM Review r WHERE r.member.memberId = :memberId")
    Page<Review> findAllByMemberId(@Param("memberId") Long memberId, Pageable pageable);
}
