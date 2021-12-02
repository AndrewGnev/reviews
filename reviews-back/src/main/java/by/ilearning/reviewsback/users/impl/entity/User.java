package by.ilearning.reviewsback.users.impl.entity;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "`user`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany
    private List<Review> reviews;

    private String snId;
    private String username;
    private String provider;
    private Boolean locked;

    public User(String snId, String username, String provider, Boolean locked) {
        this(null, null, snId, username, provider, locked);
    }
}
