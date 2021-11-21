package by.ilearning.reviewsback.security.jwt;


import by.ilearning.reviewsback.users.impl.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class JwtAuthenticationPrincipal {

    private final Long id;
    private final Boolean locked;
    @Getter
    private final Collection<? extends GrantedAuthority> authorities;

    public static JwtAuthenticationPrincipal create(User user) {
        return new JwtAuthenticationPrincipal(
                user.getId(),
                user.getLocked(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }

    public String getName() {
        return Long.toString(id);
    }

    public Boolean getDetails() {
        return locked;
    }
}
