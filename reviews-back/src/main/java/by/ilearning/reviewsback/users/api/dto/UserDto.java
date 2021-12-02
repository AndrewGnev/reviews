package by.ilearning.reviewsback.users.api.dto;

import lombok.Data;

@Data
public class UserDto {
    Long id;
    String username;
    String provider;
}
