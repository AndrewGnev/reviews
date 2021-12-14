import { useQueryClient } from 'react-query';
import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { deleteReview } from '../../api/review';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';
import { CacheEvent, updateMeCache, updateReviewsCache } from '../../utils/updateCache';

export const useDeleteReview = (): (reviewId: number) => void => {
    const queryClient = useQueryClient();
    const authenticatedDeleteReview = useAuthenticatedMutation(deleteReview);

    return useCallback(async (reviewId) => {
        const result: number | undefined = await authenticatedDeleteReview(reviewId);

        if (result !== undefined) {
            updateReviewsCache(queryClient, null, reviewId, CacheEvent.DELETE);
            updateMeCache(queryClient, null, reviewId, CacheEvent.DELETE);

            queryClient.removeQueries([QueryKey.REVIEW, reviewId, 'read']);
            queryClient.removeQueries([QueryKey.REVIEW, reviewId, 'edit']);
        }

    }, [queryClient, authenticatedDeleteReview]);
}