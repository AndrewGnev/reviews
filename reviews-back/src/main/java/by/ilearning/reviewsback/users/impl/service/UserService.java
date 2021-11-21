package by.ilearning.reviewsback.users.impl.service;

import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /*public void addPossibleNewUser(OAuth2LoginAuthenticationToken authentication) {
        User possibleNewUser = new User(
                authentication.getPrincipal().getAttribute("id"),
                authentication.getPrincipal().getAttribute("name"),
                authentication.getClientRegistration().getRegistrationId()
        );

        if (userRepository.findBySnIdAndProvider(possibleNewUser.getSnId(), possibleNewUser.getProvider()) == null)
            userRepository.save(possibleNewUser);
    }*/

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
        return userRepository.findById(id);
    }
}
