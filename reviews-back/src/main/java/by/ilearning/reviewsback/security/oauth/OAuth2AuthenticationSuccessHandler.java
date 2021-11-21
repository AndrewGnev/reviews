package by.ilearning.reviewsback.security.oauth;

import by.ilearning.reviewsback.security.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${app.defaultRedirectUrl:http://localhost:3000/redirect}")
    private String defaultTargetUrl;

    private final JwtProvider jwtProvider;
    private final OAuthUserLoginStrategyManager oAuthUserLoginStrategyManager;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        if (authentication instanceof OAuth2AuthenticationToken) {

            oAuthUserLoginStrategyManager.login((OAuth2AuthenticationToken) authentication);
            String targetUrl = determineTargetUrl((OAuth2AuthenticationToken) authentication);

            if (response.isCommitted()) {
                logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
                return;
            }

            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }

    protected String determineTargetUrl(OAuth2AuthenticationToken authentication) {
        String token = jwtProvider.createToken(authentication);

        return UriComponentsBuilder.fromUriString(defaultTargetUrl)
                .queryParam("token", token)
                .build().toUriString();
    }
}