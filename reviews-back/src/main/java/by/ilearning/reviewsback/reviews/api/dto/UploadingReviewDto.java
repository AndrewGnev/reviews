package by.ilearning.reviewsback.reviews.api.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Data
public class UploadingReviewDto {
    Long id;
    String tittle;
    String content;
    int grade;
    List<String> categories;
    Set<String> tagsNames;
    Set<MultipartFile> images;
}
