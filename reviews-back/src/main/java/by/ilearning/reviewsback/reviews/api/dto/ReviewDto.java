package by.ilearning.reviewsback.reviews.api.dto;

import by.ilearning.reviewsback.users.api.dto.UserDto;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ReviewDto {
    Long id;
    UserDto author;
    String tittle;
    String content;
    int grade;
    List<String> categories;
    Integer likesCount;
    Double usersGradesAvg;
    Set<String> tagsNames;
    Set<String> imagesUrls;
}
