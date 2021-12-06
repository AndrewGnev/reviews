package by.ilearning.reviewsback.reviews.impl.repository;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.users.impl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByAuthor(User author);
}
