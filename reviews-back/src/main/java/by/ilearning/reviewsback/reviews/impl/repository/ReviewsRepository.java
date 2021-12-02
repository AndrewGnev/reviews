package by.ilearning.reviewsback.reviews.impl.repository;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.usersGrade.impl.entity.UsersGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface ReviewsRepository extends JpaRepository<Review, Long> {
}
