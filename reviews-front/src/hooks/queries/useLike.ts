import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { like } from '../../api/like';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { QueryKey } from '../../queryClient';
import { isArrayOf } from '../../utils/isArrayOf';
import { isReview } from '../../api/data/Review';
import { CacheEvent, updateReviewsCache } from '../../utils/updateCache';

export const useLike = (): (reviewId: number) => void => {

    const queryClient = useQueryClient();
    const authenticatedLike = useAuthenticatedMutation(like);

    return useCallback(async (reviewId) => {
        const result = await authenticatedLike(reviewId);
        if (result !== undefined) {
            queryClient.setQueryData([QueryKey.REVIEW, reviewId, 'read'], result);

            updateReviewsCache(queryClient, result, reviewId, CacheEvent.UPDATE);
        }

    },[queryClient, authenticatedLike])
}