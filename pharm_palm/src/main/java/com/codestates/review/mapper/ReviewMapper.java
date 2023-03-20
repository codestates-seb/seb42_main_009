package com.codestates.review.mapper;

import com.codestates.review.dto.ReviewPatchDto;
import com.codestates.review.dto.ReviewPostDto;
import com.codestates.review.dto.ReviewResponseDto;
import com.codestates.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    List<ReviewResponseDto> reviewToReviewResponseDtos(List<Review> reviews);
}
