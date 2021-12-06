package by.ilearning.reviewsback.security;

import by.ilearning.reviewsback.security.jwt.JwtAuthenticationFilter;
import by.ilearning.reviewsback.security.oauth.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityAdapter extends WebSecurityConfigurerAdapter {

	private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.cors()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.antMatchers(
					"/",
					"/oauth2/**",
					"/signIn",
					"/redirect",
					"/index.html",
					"/static/**",
					"/api/**"
			).permitAll()
			.anyRequest().authenticated()
			.and()
			.oauth2Login()
			.loginPage("/signIn")
			.successHandler(oAuth2AuthenticationSuccessHandler)
			.and()
			.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
