package by.ilearning.reviewsback.reviews.likes.api.controller;

import by.ilearning.reviewsback.reviews.likes.impl.service.LikeService;
import by.ilearning.reviewsback.security.jwt.JwtAuthenticationPrincipal;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LikesController {

    private final LikeService likeService;

    @PostMapping("/api/reviews/{reviewId}/like")
    public void like(
            @AuthenticationPrincipal JwtAuthenticationPrincipal principal,
            @PathVariable("reviewId") Long reviewId
    ) throws NotFoundException {
        likeService.like(reviewId, Long.parseLong(principal.getName()));
    }
}
