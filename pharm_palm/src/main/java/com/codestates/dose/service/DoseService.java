package com.codestates.dose.service;

import com.codestates.dose.dto.DosePostDto;
import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.entity.Dose;
import com.codestates.dose.mapper.DoseMapper;
import com.codestates.dose.repository.DoseRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.medicine.entity.Medicine;
import com.codestates.medicine.repository.MedicineRepository;
import com.codestates.medicine.service.MedicineService;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoseService {
    private final DoseRepository doseRepository;
    private final MemberService memberService;
    private final MedicineService medicineService;

    private final DoseMapper mapper;

    public DoseService(DoseRepository doseRepository, MemberService memberService, MedicineService medicineService, DoseMapper mapper) {
        this.doseRepository = doseRepository;
        this.memberService = memberService;
        this.medicineService = medicineService;
        this.mapper = mapper;
    }


    public Dose createDose(DosePostDto dosePostDto) {
        Medicine medicine = medicineService.findVerifiedMedicine(dosePostDto.getMedicineId());
        verifyExistsDose(dosePostDto.getMemberId(), medicine.getMedicineName());

        Dose dose = mapper.dosePostDtoToDose(dosePostDto);

        Member member = memberService.findMember(dosePostDto.getMemberId());

        dose.setMember(member);
        dose.setMedicine(medicine);


        return doseRepository.save(dose);
    }

    private void verifyExistsDose(long memberId, String medicineName) {
        Optional<Dose> optionalDose = doseRepository.findByMember_MemberIdAndMedicine_MedicineName(memberId, medicineName);
        if(optionalDose.isPresent()) throw new BusinessLogicException(ExceptionCode.DOSE_ALREADY_EXISTS);
    }

    public List<DoseResponseDto> findDoses(long memberId) {
        List<Dose> doses = doseRepository.findDoseByMemberId(memberId);

        List<DoseResponseDto> doseResponses = mapper.dosesToDoseResponses(doses);
        return doseResponses;
    }

    public void deleteDose(long doseId) {
        Dose findDose = findDose(doseId);
        doseRepository.delete(findDose);
    }

    private Dose findDose(long doseId) {
       Optional<Dose> optionalDose = doseRepository.findById(doseId);

        return optionalDose.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.DOSE_NOT_FOUND));
    }
}
