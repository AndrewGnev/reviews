package by.ilearning.reviewsback.reviews.tags.impl.repository;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.tags.impl.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TagsRepository extends JpaRepository<Tag, Long> {
    Set<Tag> findByNameStartingWith(String prefix);
    Tag findByName(String name);
}
