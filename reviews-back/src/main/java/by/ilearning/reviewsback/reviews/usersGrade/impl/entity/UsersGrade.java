package by.ilearning.reviewsback.reviews.usersGrade.impl.entity;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.users.impl.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "`users_grade`")
public class UsersGrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int grade;

    @OneToOne(fetch = FetchType.LAZY)
    private Review review;

    @OneToOne
    private User grader;

    public UsersGrade(int grade, Review review, User grader) {
        this(null, grade, review, grader);
    }
}
