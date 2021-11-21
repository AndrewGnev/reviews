package by.ilearning.reviewsback.security.jwt;

import by.ilearning.reviewsback.users.impl.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtProvider {

    private final SecretKey key;
    private final Duration tokenLifeTime;

    private final UserService userService;

    public JwtProvider(
            UserService userService,
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.lifetime}") int tokenLifeTimeInHours
    ) {
        this.userService = userService;
        key = Keys.hmacShaKeyFor(secret.trim().getBytes(StandardCharsets.UTF_8));
        tokenLifeTime = Duration.of(tokenLifeTimeInHours, ChronoUnit.HOURS);
    }

    public String createToken(OAuth2AuthenticationToken authentication) {

        return Jwts.builder()
                .setSubject(Long.toString(getUserIdByOAuthToken(authentication)))
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(tokenLifeTime)))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Long getUserIdFromToken(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build().parseClaimsJws(authToken);

            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Token is expired or invalid");
        }
    }

    private Long getUserIdByOAuthToken(OAuth2AuthenticationToken authentication) {

        return userService.getUserIdBySnIdAndProvider(
                authentication.getPrincipal().getName(),
                authentication.getAuthorizedClientRegistrationId()
        );
    }
}
