package by.ilearning.reviewsback.reviews.likes.impl.service;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.impl.service.ReviewsService;
import by.ilearning.reviewsback.reviews.likes.impl.entity.Like;
import by.ilearning.reviewsback.reviews.likes.impl.repository.LikeRepository;
import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.service.UserService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final ReviewsService reviewsService;
    private final UserService userService;

    public void like(Long reviewId, Long likerId) throws NotFoundException {

        Review review = reviewsService.getReviewByIdStrict(reviewId);
        User liker = userService.findByIdStrict(likerId);
        Like like = likeRepository.findByReviewAndLiker(review, liker);

        if (like == null) {
            likeRepository.save(new Like(review, review.getAuthor(), liker));
        } else {
            likeRepository.delete(like);
        }
    }
}
