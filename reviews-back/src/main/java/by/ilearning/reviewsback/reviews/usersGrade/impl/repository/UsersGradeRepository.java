package by.ilearning.reviewsback.reviews.usersGrade.impl.repository;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.usersGrade.impl.entity.UsersGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersGradeRepository extends JpaRepository<UsersGrade, Long> {
    Long countUsersGradesByReview(Review review);

    @Query("SELECT SUM(ug.grade) FROM UsersGrade ug WHERE ug.review = :review")
    Long sumUsersGradesByReview(Review review);
}
