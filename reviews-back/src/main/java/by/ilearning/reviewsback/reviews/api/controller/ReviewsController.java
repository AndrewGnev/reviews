package by.ilearning.reviewsback.reviews.api.controller;

import by.ilearning.reviewsback.reviews.api.dto.ReviewDto;
import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.impl.service.ReviewsService;
import by.ilearning.reviewsback.reviews.mapper.ReviewsMapper;
import by.ilearning.reviewsback.security.jwt.JwtAuthenticationPrincipal;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewsController {

    private final ReviewsService reviewsService;

    @PostMapping
    public long addReview(@RequestBody ReviewDto dto, @AuthenticationPrincipal JwtAuthenticationPrincipal principal) {
        return reviewsService.addReview(dto, principal.getName());
    }

    @GetMapping
    public List<ReviewDto> getAllReviews() {
        return reviewsService.getReviews().stream()
                .map(ReviewsMapper.INSTANCE::reviewToReviewDto)
                .collect(Collectors.toList());
    }

    @GetMapping("{reviewId}")
    public ReviewDto getReviewById(
            @PathVariable("reviewId") Long reviewId,
            @RequestParam(required = false, defaultValue = "false") boolean markdown
    ) throws NotFoundException {
        Review review = reviewsService.getReviewByIdStrict(reviewId);
        ReviewDto dto = ReviewsMapper.INSTANCE.reviewToReviewDto(review);

        if (markdown) {
            dto.setContent(review.getContentInMd());
        }

        return dto;
    }

    @PutMapping("{reviewId}")
    public long updateReview(
            @RequestBody ReviewDto reviewDto,
            @PathVariable("reviewId") Long reviewId,
            @AuthenticationPrincipal JwtAuthenticationPrincipal principal
    ) throws NotFoundException {
        return reviewsService.updateReview(reviewDto, reviewId, principal.getName());
    }

    @GetMapping("categories")
    public List<String> getCategories() {
        return reviewsService.getCategories();
    }

    @GetMapping("search")
    public List<ReviewDto> searchReviews(@RequestBody String text) {
        return reviewsService.searchReview(text).stream().map(ReviewsMapper.INSTANCE::reviewToReviewDto)
                .collect(Collectors.toList());
    }

}
