package com.codestates.member.mapper;

import com.codestates.dose.dto.DoseResponseDto;
import com.codestates.dose.entity.Dose;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);
    MemberResponseDto memberToMemberResponseDto(Member member);


    default MemberResponseDto memberToMemberResponse(Member member) {
        List<Dose> doses = member.getDoses();

        MemberResponseDto memberResponseDto = new MemberResponseDto();
        memberResponseDto.setMemberId(member.getMemberId());
        memberResponseDto.setMemberGender(member.getMemberGender());
        memberResponseDto.setMemberEmail(member.getMemberEmail());
        memberResponseDto.setMemberAge(member.getMemberAge());
        memberResponseDto.setMemberName(member.getMemberName());
        memberResponseDto.setMemberState(member.getMemberState());
        memberResponseDto.setAlarm(member.isAlarm());
        memberResponseDto.setDoses(
                doseToDoseResponse(doses)
        );
        return memberResponseDto;
    }

    default List<DoseResponseDto> doseToDoseResponse(List<Dose> doses) {
        return doses
                .stream()
                .map(dose -> DoseResponseDto
                        .builder()
                        .medicineId(dose.getMedicine().getMedicineId())
                        .medicineName(dose.getMedicine().getMedicineName())
                        .doseId(dose.getDoseId())
                        .doseMount(dose.getDoseMount())
                        .doseNumber(dose.getDoseNumber())
                        .doseTimes(dose.getDoseTimes())
                        .memberId(dose.getMember().getMemberId())
                        .build())
                .collect(Collectors.toList());
    }
}
