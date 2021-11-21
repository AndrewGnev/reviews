package by.ilearning.reviewsback.security;

import by.ilearning.reviewsback.security.oauth.OAuth2AuthenticationSuccessHandler;
import by.ilearning.reviewsback.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityAdapter extends WebSecurityConfigurerAdapter {

	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.authorizeRequests(a -> a
				.antMatchers("/", "/error", "/oauth2/**").permitAll()
				.anyRequest().authenticated()
			)
			.oauth2Login()
				.successHandler(oAuth2AuthenticationSuccessHandler)
			.and()
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
