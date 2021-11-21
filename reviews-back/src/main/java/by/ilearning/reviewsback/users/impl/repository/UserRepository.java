package by.ilearning.reviewsback.users.impl.repository;

import by.ilearning.reviewsback.users.impl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findBySnIdAndProvider(String snId, String provider);
    User findByUsername(String username);
    User findById(Long id);
}
