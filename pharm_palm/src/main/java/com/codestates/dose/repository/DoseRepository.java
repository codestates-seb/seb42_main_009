package com.codestates.dose.repository;

import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.entity.Dose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DoseRepository extends JpaRepository<Dose, Long> {
    Optional<Dose> findByMember_MemberIdAndMedicine_MedicineName(Long memberId, String medicineName);

    List<Dose> findAllByMember_MemberId(Long memberId);

    @Query(value = "SELECT * FROM dose WHERE member_id = :id", nativeQuery = true)
    List<Dose> findDoseByMemberId(@Param("id") Long memberId);


//    @Query(value = "SELECT new com.codestates.dose.dto.DoseResponseDto(d.doseId, d.doseMount, d.doseNumber, d.doseTime ,m.medicineName) FROM Dose d JOIN d.medicine m WHERE m.medicineId = :medicineId")
//    List<DoseResponseDto> findDoseResponseDtoById(Long medicineId);
}
