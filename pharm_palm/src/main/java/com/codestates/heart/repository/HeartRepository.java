package com.codestates.heart.repository;

import com.codestates.heart.entity.Heart;
import com.codestates.medicine.entity.Medicine;
import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Optional;


public interface HeartRepository extends JpaRepository<Heart, Long>  {


    Optional<Heart> findByMedicineAndMember(Medicine medicine, Member member);
}
