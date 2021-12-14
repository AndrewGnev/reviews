package by.ilearning.reviewsback.reviews.impl.service;

import by.ilearning.reviewsback.reviews.api.dto.UploadingReviewDto;
import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.impl.repository.ReviewsFullTextSearch;
import by.ilearning.reviewsback.reviews.impl.repository.ReviewsRepository;
import by.ilearning.reviewsback.reviews.mapper.ReviewsMapper;
import by.ilearning.reviewsback.reviews.photos.impl.service.PhotosService;
import by.ilearning.reviewsback.reviews.tags.impl.service.TagsService;
import by.ilearning.reviewsback.users.impl.service.UserService;
import javassist.NotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReviewsService {

    @Getter
    private final List<String> categories = new ArrayList<>(Arrays.asList(
            "Кино", "Книги", "Игры"
    ));

    private final ReviewsRepository reviewsRepository;
    private final UserService userService;
    private final TagsService tagsService;
    private final PhotosService photosService;
    private final ReviewsFullTextSearch reviewsFullTextSearch;

    private final HtmlRenderer markdownHtmlRenderer;
    private final Parser markdownParser;
    private final Document.OutputSettings jsoupOutputSettings;

    public List<Review> searchReview(String text) {
        return reviewsFullTextSearch.searchTextInReviewTittleAndContent(text);
    }

    public Review addReview(UploadingReviewDto dto, String authorId) throws NotFoundException, IOException {

        assertCategories(dto.getCategories());

        Review newReview = ReviewsMapper.INSTANCE.uploadingReviewDtoToReview(dto);

        setReviewFields(newReview, Long.parseLong(authorId), dto.getImages());

        return reviewsRepository.save(newReview);
    }

    public Review updateReview(UploadingReviewDto dto, Long reviewId, String authorId)
            throws NotFoundException, IOException {

        if (!dto.getId().equals(reviewId))
            throw new IllegalArgumentException("Id from url isn`t equal to review id");

        Review updatingReview = getReviewByIdStrict(dto.getId());

        assertUpdatingReviewData(updatingReview, dto, authorId);

        return reviewsRepository.save(updateReviewData(updatingReview, dto));
    }

    public long deleteReview(Long reviewId, String authorId) throws NotFoundException {

        Review deletingReview = getReviewByIdStrict(reviewId);

        if (!deletingReview.getAuthor().getId().equals(Long.parseLong(authorId))) {
            throw new IllegalArgumentException("You can delete only your reviews");
        }

        reviewsRepository.delete(deletingReview);

        return reviewId;
    }

    public Review getReviewByIdStrict(Long id) throws NotFoundException {
        return reviewsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review with id " + id + " not found"));
    }

    public List<Review> getReviews() {
        return reviewsRepository.findAll();
    }

    private void setReviewContent(Review review) {

        review.setContentInHtml(mdToHtml(review.getContentInMd()));

        review.setPlainTextContent(
                Jsoup.clean(
                        review.getContentInHtml(),
                        "",
                        Safelist.none(),
                        jsoupOutputSettings
                )
        );
    }

    private void setReviewFields(Review newReview, Long authorId, Set<MultipartFile> images
    ) throws NotFoundException, IOException {

        newReview.setAuthor(userService.findById(authorId));
        newReview.setTags(tagsService.addTags(newReview.getTags()));
        setReviewContent(newReview);

        if (images != null) setImagesUrls(newReview, images);
    }

    private void setImagesUrls(Review newReview, Set<MultipartFile> images) throws NotFoundException, IOException {
        for (MultipartFile image: images) {
            String imageUrl = photosService.uploadImage(image);
            newReview.getImagesUrls().add(imageUrl);
        }
    }

    private String mdToHtml(String md) {
        return cleanHtml(markdownHtmlRenderer.render(markdownParser.parse(md)));
    }

    private String cleanHtml(String html) {
        return Jsoup.clean(
                html,
                "",
                Safelist.basic().addTags("h1", "h2", "h3", "h4", "h5", "h6"),
                jsoupOutputSettings
        );
    }

    private Review updateReviewData(Review updatingReview, UploadingReviewDto dto)
            throws NotFoundException, IOException {

        updatingReview.setGrade(dto.getGrade());
        updatingReview.setTags(tagsService.addTags(updatingReview.getTags()));

        updatingReview.setContentInMd(dto.getContent());
        setReviewContent(updatingReview);

        if (dto.getImages() != null) setImagesUrls(updatingReview, dto.getImages());

        return updatingReview;
    }

    private void assertUpdatingReviewData(Review updatingReview, UploadingReviewDto dto, String authorId) {
        assertCategories(dto.getCategories());

        if (!updatingReview.getAuthor().getId().equals(Long.parseLong(authorId)))
            throw new IllegalArgumentException("You can change only your reviews");

    }

    private void assertCategories(List<String> categories) {
        for (String c : categories) {
            if (!categories.contains(c)) {
                throw new IllegalArgumentException("Category " + c + " does not exist");
            }
        }
    }
}
