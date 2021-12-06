package by.ilearning.reviewsback.users.mapper;

import by.ilearning.reviewsback.reviews.api.dto.ReviewDto;
import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.mapper.ReviewsMapper;
import by.ilearning.reviewsback.users.api.dto.UserProfileDto;
import by.ilearning.reviewsback.users.impl.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface UserProfileMapper {

    UserProfileMapper INSTANCE = Mappers.getMapper(UserProfileMapper.class);

    @Mapping(source = "reviews", target = "reviews")
    UserProfileDto userToUserProfileDto(User user);

    default List<ReviewDto> reviewsToReviewsDtos(List<Review> reviews) {
        return reviews.stream().map(ReviewsMapper.INSTANCE::reviewToReviewDto).collect(Collectors.toList());
    }
}
