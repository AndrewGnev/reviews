package by.ilearning.reviewsback.reviews.usersGrade.api.controller;

import by.ilearning.reviewsback.reviews.api.dto.ReviewDto;
import by.ilearning.reviewsback.reviews.mapper.ReviewsMapper;
import by.ilearning.reviewsback.reviews.usersGrade.impl.service.UsersGradeService;
import by.ilearning.reviewsback.security.jwt.JwtAuthenticationPrincipal;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UsersGradeController {

    private final UsersGradeService usersGradeService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/api/reviews/{reviewId}/grade")
    public ReviewDto addGrade(
            @PathVariable("reviewId") Long reviewId,
            @AuthenticationPrincipal JwtAuthenticationPrincipal principal,
            @RequestBody int grade
    ) throws NotFoundException, IllegalArgumentException {
        return ReviewsMapper.INSTANCE.reviewToReviewDto(
                usersGradeService.addGrade(grade, reviewId, Long.parseLong(principal.getName()))
        );
    }
}