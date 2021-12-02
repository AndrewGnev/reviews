package by.ilearning.reviewsback.reviews.usersGrade.impl.service;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.impl.service.ReviewsService;
import by.ilearning.reviewsback.reviews.usersGrade.impl.entity.UsersGrade;
import by.ilearning.reviewsback.reviews.usersGrade.impl.repository.UsersGradeRepository;
import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.service.UserService;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersGradeService {

    private final int GRADE_MAXIMUM = 5;

    private final UsersGradeRepository usersGradeRepository;
    private final ReviewsService reviewsService;
    private final UserService userService;

    public long addGrade(int grade, Long reviewId, Long graderId) throws NotFoundException, IllegalArgumentException {
        if (grade > GRADE_MAXIMUM) throw new IllegalArgumentException("Provided grade is bigger than maximum");

        User grader = userService.findByIdStrict(graderId);
        Review review = reviewsService.getReviewByIdStrict(reviewId);

//        reviewsService.updateReviewUsersGrade(
//                review,
//                (double) (sumReviewsUsersGrades(review) + grade) / (countReviewsUsersGrades(review) + 1)
//        );

        return usersGradeRepository.save(new UsersGrade(grade, review, grader)).getId();
    }

    public Long countReviewsUsersGrades(Review review) {
        return usersGradeRepository.countUsersGradesByReview(review);
    }

    public Long sumReviewsUsersGrades(Review review) {
        return usersGradeRepository.sumUsersGradesByReview(review);
    }
}
