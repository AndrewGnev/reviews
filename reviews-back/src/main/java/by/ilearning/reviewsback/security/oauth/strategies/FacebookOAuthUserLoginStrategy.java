package by.ilearning.reviewsback.security.oauth.strategies;

import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.service.UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class FacebookOAuthUserLoginStrategy extends OAuthUserLoginStrategy {

    public FacebookOAuthUserLoginStrategy(UserService userService) {
        super("facebook", userService);
    }

    @Override
    public User login(OAuth2User principal) {
        return login(principal.getAttribute("id"), principal.getAttribute("name"));
    }
}
