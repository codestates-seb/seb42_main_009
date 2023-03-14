package com.codestates.dose.service;

import com.codestates.dose.dto.DosePostDto;
import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.entity.Dose;
import com.codestates.dose.mapper.DoseMapper;
import com.codestates.dose.repository.DoseRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoseService {
    private final DoseRepository doseRepository;

    private final DoseMapper mapper;
    public DoseService(DoseRepository doseRepository, DoseMapper mapper) {
        this.doseRepository = doseRepository;
        this.mapper = mapper;
    }

    public DoseResponseDto createDose(DosePostDto dosePostDto) {
        Dose dose = mapper.dosePostDtoToDose(dosePostDto);
        verifyExistsDose(dose.getMemberId(), dose.getMedicineName());

        dose = doseRepository.save(dose);
        DoseResponseDto doseResponseDto = mapper.doseToResponseDto(dose);
        return doseResponseDto;
    }

    private void verifyExistsDose(Long memberId, String medicineName) {
        Optional<Dose> optionalDose = doseRepository.findByMemberIdAndMedicineName(memberId, medicineName);
        if(optionalDose.isPresent()) throw new BusinessLogicException(ExceptionCode.DOSE_ALREADY_EXISTS);
    }

    public List<DoseResponseDto> findDoses(long memberId) {
        List<Dose> doses = doseRepository.findAllByMemberId(memberId);
        List<DoseResponseDto> doseResponses = mapper.dosesToDoseResponses(doses);
        return doseResponses;
    }
}
