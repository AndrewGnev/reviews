package by.ilearning.reviewsback.security.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final JwtAuthenticationPrincipal principal;

    public JwtAuthenticationToken(JwtAuthenticationPrincipal principal) {
        super(principal.getAuthorities());
        this.principal = principal;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Boolean getDetails() {
        return principal.getDetails();
    }

    @Override
    public JwtAuthenticationPrincipal getPrincipal() {
        return principal;
    }

    @Override
    public boolean isAuthenticated() {
        return false;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        throw new UnsupportedOperationException();
    }

    @Override
    public String getName() {
        return principal.getName();
    }
}
