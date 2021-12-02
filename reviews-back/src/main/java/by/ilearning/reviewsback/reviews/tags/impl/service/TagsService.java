package by.ilearning.reviewsback.reviews.tags.impl.service;

import by.ilearning.reviewsback.reviews.tags.impl.entity.Tag;
import by.ilearning.reviewsback.reviews.tags.impl.repository.TagsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagsService {

    private final TagsRepository tagsRepository;

    public Set<Tag> getTagsByPrefix(String prefix) {
        return tagsRepository.findByNameStartingWith(prefix);
    }

    public Set<Tag> addTags(Set<Tag> tags) {
        return tags.stream().map(this::addTag).collect(Collectors.toSet());
    }

    private Tag addTag(Tag tag) {

        Tag dbTag = tagsRepository.findByName(tag.getName());

        return dbTag == null ? tagsRepository.save(tag) : dbTag;
    }
}
