package by.ilearning.reviewsback.reviews.likes.impl.repository;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.likes.impl.entity.Like;
import by.ilearning.reviewsback.users.impl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByReviewAndLiker(Review review, User liker);
}
