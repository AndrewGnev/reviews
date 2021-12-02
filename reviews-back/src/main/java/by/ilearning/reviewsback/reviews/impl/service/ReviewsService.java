package by.ilearning.reviewsback.reviews.impl.service;

import by.ilearning.reviewsback.reviews.api.dto.ReviewDto;
import by.ilearning.reviewsback.reviews.impl.entity.Review;
import by.ilearning.reviewsback.reviews.impl.repository.ReviewsFullTextSearch;
import by.ilearning.reviewsback.reviews.impl.repository.ReviewsRepository;
import by.ilearning.reviewsback.reviews.mapper.ReviewsMapper;
import by.ilearning.reviewsback.reviews.tags.impl.service.TagsService;
import by.ilearning.reviewsback.users.impl.service.UserService;
import by.ilearning.reviewsback.users.mapper.UsersMapper;
import javassist.NotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Safelist;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.*;

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
    private final ReviewsFullTextSearch reviewsFullTextSearch;

    private final HtmlRenderer markdownHtmlRenderer;
    private final Parser markdownParser;
    private final Document.OutputSettings jsoupOutputSettings;

    public List<Review> searchReview(String text) {
        return reviewsFullTextSearch.searchProductNameByKeywordQuery(text);
    }

    public long addReview(ReviewDto dto, String authorId) {

        assertCategories(dto.getCategories());

        Review newReview = ReviewsMapper.INSTANCE.reviewDtoToReview(dto);

        newReview.setAuthor(userService.findById(Long.parseLong(authorId)));
        newReview.setTags(tagsService.addTags(newReview.getTags()));
        newReview.setContentInHtml(mdToHtml(newReview.getContentInMd()));

        return reviewsRepository.save(newReview).getId();
    }

    public long updateReview(ReviewDto dto, Long reviewId, String authorId) throws NotFoundException {

        if (!dto.getId().equals(reviewId))
            throw new IllegalArgumentException("Id from url isn`t equal to review id");

        Review updatingReview = getReviewByIdStrict(dto.getId());

        assertUpdatingReviewData(updatingReview, dto, authorId);

        return reviewsRepository.save(updateReviewData(updatingReview, dto)).getId();
    }

    public Review getReviewByIdStrict(Long id) throws NotFoundException {
        return reviewsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review with id " + id + " not found"));
    }

    public List<Review> getReviews() {
        return reviewsRepository.findAll();
    }

    private String mdToHtml(String md) {
        return cleanHtml(markdownHtmlRenderer.render(markdownParser.parse(md)));
    }

    private String cleanHtml(String html) {
        return Jsoup.clean(
                html, "",
                Safelist.basic().addTags("h1", "h2", "h3", "h4", "h5", "h6"),
                jsoupOutputSettings
        );
    }

    private Review updateReviewData(Review updatingReview, ReviewDto dto) {
        updatingReview = ReviewsMapper.INSTANCE.reviewDtoToReview(dto);

        updatingReview.setTags(tagsService.addTags(updatingReview.getTags()));
        updatingReview.setContentInHtml(mdToHtml(dto.getContent()));

        return updatingReview;
    }

    private void assertUpdatingReviewData(Review updatingReview, ReviewDto dto, String authorId) {
        assertCategories(dto.getCategories());

        if (!updatingReview.getAuthor().getId().equals(Long.parseLong(authorId)))
            throw new IllegalArgumentException("You can change only your reviews");

        if (!UsersMapper.INSTANCE.userToUserDto(updatingReview.getAuthor()).equals(dto.getAuthor()))
            throw new IllegalArgumentException("Review`s author can`t be changed");
    }

    private void assertCategories(List<String> categories) {
        for (String c : categories) {
            if (!categories.contains(c)) {
                throw new IllegalArgumentException("Category " + c + " does not exist");
            }
        }
    }
}
