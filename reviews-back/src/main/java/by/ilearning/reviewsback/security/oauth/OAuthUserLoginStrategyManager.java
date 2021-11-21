package by.ilearning.reviewsback.security.oauth;

import by.ilearning.reviewsback.security.oauth.strategies.FacebookOAuthUserLoginStrategy;
import by.ilearning.reviewsback.security.oauth.strategies.GithubOAuthUserLoginStrategy;
import by.ilearning.reviewsback.security.oauth.strategies.GoogleOAuthUserLoginStrategy;
import by.ilearning.reviewsback.security.oauth.strategies.OAuthUserLoginStrategy;
import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.impl.service.UserService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class OAuthUserLoginStrategyManager {

    private final Map<String, OAuthUserLoginStrategy> strategies;

    public OAuthUserLoginStrategyManager(UserService userService) {
        this.strategies = new HashMap<>();

        addStrategy(new FacebookOAuthUserLoginStrategy(userService));
        addStrategy(new GithubOAuthUserLoginStrategy(userService));
        addStrategy(new GoogleOAuthUserLoginStrategy(userService));
    }

    public void addStrategy(OAuthUserLoginStrategy strategy) {
        strategies.put(strategy.getProvider(), strategy);
    }

    public User login(OAuth2AuthenticationToken authentication) {
        final OAuthUserLoginStrategy strategy = strategies.get(authentication.getAuthorizedClientRegistrationId());

        if (strategy == null) {
            return null;
        }

        return strategy.login(authentication.getPrincipal());
    }
}
