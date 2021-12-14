import { useQueryClient } from 'react-query';
import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { createReview } from '../../api/review';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';
import { NewReview } from '../../api/data/Review';
import { CacheEvent, updateMeCache, updateReviewsCache } from '../../utils/updateCache';

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    const authenticatedCreateReview = useAuthenticatedMutation(createReview);

    return useCallback(async (review: NewReview) => {
        const result = await authenticatedCreateReview(review);

        if (result !== undefined) {
            queryClient.setQueryData([QueryKey.REVIEW, result.id, 'read'], result);

            updateReviewsCache(queryClient, result, null, CacheEvent.ADD);
            updateMeCache(queryClient, result, null, CacheEvent.ADD);
        }

        return result;
    }, [queryClient, authenticatedCreateReview])
}