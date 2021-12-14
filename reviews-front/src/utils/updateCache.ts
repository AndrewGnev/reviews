import { QueryClient } from 'react-query';
import { Review } from '../api/data/Review';
import { User } from '../api/data/User';
import { QueryKey } from '../queryClient';

export enum CacheEvent {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete',
}

export const updateMeCache = (queryClient: QueryClient, review: Review | null, reviewId: number | null, event: CacheEvent) => {
    const me: User | undefined = queryClient.getQueryData(QueryKey.ME);

    if (!me) {
        return;
    }

    switch (event) {
        case CacheEvent.DELETE:
            queryClient.setQueryData(QueryKey.ME, {
                ...me,
                reviews: me.reviews.filter(r => r.id !== reviewId),
            });

            break;

        case CacheEvent.UPDATE:
            if (review) {
                queryClient.setQueryData(QueryKey.ME, {
                    ...me,
                    reviews: me.reviews.map(r => (r.id === reviewId) ? review : r),
                });
            }

            break;

        case CacheEvent.ADD:
            if (review) {
                queryClient.setQueryData(QueryKey.ME, {
                    ...me,
                    reviews: [...me.reviews, review],
                });
            }

            break;
    }
}

export const updateReviewsCache = (queryClient: QueryClient, review: Review | null, reviewId: number | null, event: CacheEvent) => {
    const reviewsFromCache = queryClient.getQueryData<Review[]>(QueryKey.REVIEWS);
    const reviews = reviewsFromCache ? reviewsFromCache : [];

    switch (event) {
        case CacheEvent.ADD:
            if (review) {
                queryClient.setQueryData(QueryKey.REVIEWS, [...reviews, review]);
            }

            break;

        case CacheEvent.UPDATE:
            if (review) {
                console.log(review, reviewId);
                console.log(QueryKey.REVIEWS, reviews.map(r => r.id === reviewId ? review : r));
                queryClient.setQueryData(QueryKey.REVIEWS, reviews.map(r => r.id === reviewId ? review : r));
            }

            break;

        case CacheEvent.DELETE:
            queryClient.setQueryData(QueryKey.REVIEWS, reviews.filter(r => r.id !== reviewId));
            break;
    }
}