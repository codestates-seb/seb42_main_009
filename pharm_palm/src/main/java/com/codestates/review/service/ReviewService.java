package com.codestates.review.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.review.entity.Review;
import com.codestates.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;

    public Review createReview(Review review) {
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

        return reviewRepository.save(findReview);
    }

    public Review findReview(long reviewId) {
        return findVerifiedReviewId(reviewId);
    }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size,
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

