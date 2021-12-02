package by.ilearning.reviewsback.users.api.dto;

import by.ilearning.reviewsback.reviews.api.dto.ReviewDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserProfileDto extends UserDto {
    List<ReviewDto> reviews;
}
