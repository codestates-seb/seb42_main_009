package com.codestates.review.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.medicine.entity.Medicine;
import com.codestates.medicine.repository.MedicineRepository;
import com.codestates.review.entity.Review;
import com.codestates.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MedicineRepository medicineRepository;

    public Review createReview(Review review, Long medicineId) {
        Medicine medicine = medicineRepository.findByMedicineId(medicineId);

        String formattedDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분"));
        String formattedDateLastModifiedTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분"));
        review.setCreatedAt(formattedDateTime);
        review.setLastModifiedAt(formattedDateLastModifiedTime);
        review.setMedicineId(medicineId);

        medicine.addReview(review);
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review) {
        Review findReview = findVerifiedReviewId(review.getReviewId());

        Optional.ofNullable(review.getReviewContent())
                .ifPresent(findReview::setReviewContent);

        Optional.ofNullable(review.getReviewImg())
                .ifPresent(findReview::setReviewImg);

        Optional.ofNullable(review.getReviewOtherMedicine())
                .ifPresent(findReview::setReviewOtherMedicine);

        Optional.ofNullable(review.getMemberId())
                .ifPresent(findReview::setMemberId);

        String formattedDateLastModifiedTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분"));
        findReview.setLastModifiedAt(formattedDateLastModifiedTime);

        return reviewRepository.save(findReview);
    }

    public Review findReview(long reviewId) {
        return findVerifiedReviewId(reviewId);
    }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    public Page<Review> findMedicineReviews(Long medicineId, int page, int size) {
        return reviewRepository.findAllByMedicineId(medicineId ,PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    public Page<Review> findMemberReviews(Long memberId, int page, int size) {
        return reviewRepository.findAllByMemberId(memberId ,PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    public void deleteReview(long reviewId) {
        Review findReview = findVerifiedReviewId(reviewId);
        reviewRepository.save(findReview);
    }

    private Review findVerifiedReviewId(long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

}

