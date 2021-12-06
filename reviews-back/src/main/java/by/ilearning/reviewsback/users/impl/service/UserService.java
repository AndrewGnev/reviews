package by.ilearning.reviewsback.users.impl.service;

import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.repository.UserRepository;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User addPossibleNewUser(String id, String username, String provider) {

        User possibleNewUser = new User(id, username, provider, false);
        User dbUser = userRepository.findBySnIdAndProvider(possibleNewUser.getSnId(), possibleNewUser.getProvider());

        if (dbUser == null || !dbUser.getUsername().equals(possibleNewUser.getUsername())) {
            userRepository.save(possibleNewUser);
        }

        return possibleNewUser;
    }

    public Long getUserIdBySnIdAndProvider(String snId, String provider) {
        return userRepository.findBySnIdAndProvider(snId, provider).getId();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByIdStrict(Long id) throws NotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id " + id + " not found"));
    }
}
