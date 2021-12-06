package by.ilearning.reviewsback.reviews.tags.api.controller;

import by.ilearning.reviewsback.reviews.tags.impl.entity.Tag;
import by.ilearning.reviewsback.reviews.tags.impl.service.TagsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class TagsController {

    private final TagsService tagsService;

    @GetMapping("/api/tags")
    public Set<String> getTagsByPrefix(@RequestBody String prefix) {
        return tagsService.getTagsByPrefix(prefix).stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());
    }
}
