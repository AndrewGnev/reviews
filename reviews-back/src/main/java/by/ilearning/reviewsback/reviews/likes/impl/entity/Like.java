package by.ilearning.reviewsback.reviews.likes.impl.entity;

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
@Table(name = "`like`")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

    @OneToOne
    private User author;

    @OneToOne
    private User liker;

    public Like(Review review, User author, User liker) {
        this(null, review, author, liker);
    }
}
