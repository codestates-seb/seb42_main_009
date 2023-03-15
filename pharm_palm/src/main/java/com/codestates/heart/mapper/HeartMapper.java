package com.codestates.heart.mapper;

import com.codestates.heart.dto.HeartPostDto;
import com.codestates.heart.entity.Heart;
import com.codestates.medicine.entity.Medicine;
import com.codestates.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HeartMapper {

    Member HeartPostDtoToMember(HeartPostDto heartPostDto);

    Medicine HeartPostDtoToMedicine(HeartPostDto heartPostDto);
}
