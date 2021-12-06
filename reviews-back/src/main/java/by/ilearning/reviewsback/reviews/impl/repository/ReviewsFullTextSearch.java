package by.ilearning.reviewsback.reviews.impl.repository;

import by.ilearning.reviewsback.reviews.impl.entity.Review;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ReviewsFullTextSearch {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Review> searchTextInReviewTittleAndContent(String text) {

        Query keywordQuery = getQueryBuilder()
                .keyword()
                .wildcard()
                .onFields("tittle", "plainTextContent")
                .matching("*" + text.trim() + "*")
                .createQuery();

        return (List<Review>) getJpaQuery(keywordQuery).getResultList();
    }

    private FullTextQuery getJpaQuery(Query luceneQuery) {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        return fullTextEntityManager.createFullTextQuery(luceneQuery, Review.class);
    }

    private QueryBuilder getQueryBuilder() {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        return fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Review.class)
                .get();
    }
}
