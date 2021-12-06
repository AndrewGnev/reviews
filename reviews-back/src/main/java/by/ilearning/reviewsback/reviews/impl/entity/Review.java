package by.ilearning.reviewsback.reviews.impl.entity;

import by.ilearning.reviewsback.reviews.likes.impl.entity.Like;
import by.ilearning.reviewsback.reviews.tags.impl.entity.Tag;
import by.ilearning.reviewsback.reviews.usersGrade.impl.entity.UsersGrade;
import by.ilearning.reviewsback.users.impl.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Indexed
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User author;

    @Field
    private String tittle;

    @Column(columnDefinition = "TEXT")
    private String contentInMd;

    @Column(columnDefinition = "TEXT")
    private String contentInHtml;

    @Field
    @Column(columnDefinition = "TEXT")
    private String plainTextContent;

    private int grade;

    @ElementCollection
    private Set<String> categories;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private Set<Like> likes;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private Set<UsersGrade> usersGrades;

    @ManyToMany
    @JoinTable(
        name = "review_tag",
        joinColumns = @JoinColumn(name = "review_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    private Set<Tag> tags;

    @ElementCollection
    private Set<String> imagesUrls;

    public Review(User author,
                  String tittle,
                  String contentInMd,
                  String contentInHtml,
                  String plainTextContent,
                  int grade,
                  Set<String> categories,
                  Set<Tag> tags
    ) {
        this(null,
                author,
                tittle,
                contentInMd,
                contentInHtml,
                plainTextContent,
                grade,
                categories,
                null,
                null,
                tags,
                new HashSet<>()
        );
    }
}
