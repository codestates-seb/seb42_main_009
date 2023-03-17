package com.codestates.heart.service;

import com.codestates.heart.dto.HeartPostDto;
import com.codestates.heart.entity.Heart;
import com.codestates.heart.mapper.HeartMapper;
import com.codestates.heart.repository.HeartRepository;
import com.codestates.medicine.entity.Medicine;
import com.codestates.medicine.repository.MedicineRepository;
import com.codestates.medicine.service.MedicineService;
import com.codestates.member.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class HeartService {
    private final HeartRepository heartRepository;
    private final HeartMapper mapper;
    private final MedicineRepository medicineRepository;
    private final MedicineService medicineService;

    public HeartService(HeartRepository heartRepository, HeartMapper mapper, MedicineRepository medicineRepository, MedicineService medicineService) {
        this.heartRepository = heartRepository;
        this.mapper = mapper;
        this.medicineRepository = medicineRepository;
        this.medicineService = medicineService;
    }




    @Transactional
    public void addLike(HeartPostDto heartPostDto) {
        Medicine medicine = mapper.HeartPostDtoToMedicine(heartPostDto);
        Member member = mapper.HeartPostDtoToMember(heartPostDto);

        Optional<Heart> heartOptional = heartRepository.findByMedicineAndMember(medicine, member);

        if (heartOptional.isPresent()) {
            Heart heart = heartOptional.get();
            heartRepository.delete(heart);

            Medicine findMedicine = medicineService.findVerifiedMedicine(heartPostDto.getMedicineId());
            findMedicine.setMedicineLike(findMedicine.getMedicineLike() - 1);
            medicineRepository.save(findMedicine);
        } else {
            Heart heart = new Heart();
            heart.setMedicine(medicine);
            heart.setMember(member);
            heartRepository.save(heart);

            Medicine findMedicine = medicineService.findVerifiedMedicine(heartPostDto.getMedicineId());
            findMedicine.setMedicineLike(findMedicine.getMedicineLike() + 1);
            medicineRepository.save(findMedicine);
        }
    }
}
