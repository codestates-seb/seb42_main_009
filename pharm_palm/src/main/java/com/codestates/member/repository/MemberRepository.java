package com.codestates.member.repository;

import com.codestates.member.entity.Member;
import com.codestates.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberEmail(String email);

    Member findByMemberId(Long memberId);

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Member m WHERE m.memberEmail = :memberEmail")
    boolean existsByEmail(@Param("memberEmail") String memberEmail);

    @Query("SELECT m.review FROM Member m WHERE m.memberId = :memberId")
    List<Review> findAllReviewsByMemberId(@Param("memberId") Long memberId);
}