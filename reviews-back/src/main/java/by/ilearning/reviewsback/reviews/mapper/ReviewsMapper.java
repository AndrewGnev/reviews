package by.ilearning.reviewsback.reviews.mapper;

import by.ilearning.reviewsback.reviews.api.dto.ReviewDto;
import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.likes.impl.entity.Like;
import by.ilearning.reviewsback.reviews.tags.impl.entity.Tag;
import by.ilearning.reviewsback.reviews.usersGrade.impl.entity.UsersGrade;
import by.ilearning.reviewsback.users.api.dto.UserDto;
import by.ilearning.reviewsback.users.impl.entity.User;
import by.ilearning.reviewsback.users.mapper.UsersMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface ReviewsMapper {

    ReviewsMapper INSTANCE = Mappers.getMapper(ReviewsMapper.class);

    @Mapping(source = "tagsNames", target = "tags")
    @Mapping(source = "content", target = "contentInMd")
    Review reviewDtoToReview(ReviewDto dto);

    @Mapping(source = "usersGrades", target = "usersGradesAvg")
    @Mapping(source = "likes", target ="likesCount")
    @Mapping(source = "tags", target = "tagsNames")
    @Mapping(source = "contentInHtml", target = "content")
    @Mapping(source = "author", target = "author")
    ReviewDto reviewToReviewDto(Review review);

    default Double usersGradesToUsersGradesAvg(Set<UsersGrade> grades) {
        return grades.stream()
                .mapToDouble(UsersGrade::getGrade)
                .average().stream()
                .boxed().findFirst()
                .orElse(null);
    }

    default Integer likesToLikesSum(Set<Like> likes) {
        return likes.size();
    }

    default Set<Tag> tagsNamesToTags(Set<String> tagsNames) {
        return tagsNames.stream()
                .map(tn -> new Tag(null, tn))
                .collect(Collectors.toSet());
    }

    default Set<String> tagsToTagsNames(Set<Tag> tags) {
        return tags.stream().map(Tag::getName).collect(Collectors.toSet());
    }

    default UserDto userToUserDto(User user) {
        return UsersMapper.INSTANCE.userToUserDto(user);
    }
}
