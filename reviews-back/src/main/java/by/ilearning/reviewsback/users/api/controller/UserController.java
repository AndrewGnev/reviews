package by.ilearning.reviewsback.users.api.controller;

import by.ilearning.reviewsback.security.jwt.JwtAuthenticationPrincipal;
import by.ilearning.reviewsback.users.api.dto.UserProfileDto;
import by.ilearning.reviewsback.users.impl.service.UserService;
import by.ilearning.reviewsback.users.mapper.UserProfileMapper;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public UserProfileDto getMe(
            @AuthenticationPrincipal JwtAuthenticationPrincipal principal
    ) throws NotFoundException {

        return UserProfileMapper.INSTANCE.userToUserProfileDto(
                userService.findByIdStrict(Long.parseLong(principal.getName()))
        );
    }
}
