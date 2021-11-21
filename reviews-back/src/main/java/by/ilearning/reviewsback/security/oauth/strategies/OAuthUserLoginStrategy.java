package by.ilearning.reviewsback.security.oauth.strategies;

import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.service.UserService;
import lombok.Getter;
import org.springframework.security.oauth2.core.user.OAuth2User;

public abstract class OAuthUserLoginStrategy {

    @Getter
    private final String provider;
    private final UserService userService;

    protected OAuthUserLoginStrategy(String provider, UserService userService) {
        this.provider = provider;
        this.userService = userService;
    }

    protected User login(String id, String name) {
        return userService.addPossibleNewUser(id, name, provider);
    }

    public abstract User login(OAuth2User principal);
}
