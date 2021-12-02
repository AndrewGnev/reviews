package by.ilearning.reviewsback.reviews.usersGrade.api.controller;

import by.ilearning.reviewsback.reviews.usersGrade.impl.service.UsersGradeService;
import by.ilearning.reviewsback.security.jwt.JwtAuthenticationPrincipal;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UsersGradeController {

    private final UsersGradeService usersGradeService;

    @PostMapping("/api/reviews/{reviewId}/grade")
    public long addGrade(
            @PathVariable("reviewId") Long reviewId,
            @AuthenticationPrincipal JwtAuthenticationPrincipal principal,
            @RequestBody int grade
    ) throws NotFoundException, IllegalArgumentException {
        return usersGradeService.addGrade(grade, reviewId, Long.parseLong(principal.getName()));
    }
}
