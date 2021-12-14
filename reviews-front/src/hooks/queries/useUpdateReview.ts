import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';
import { useQueryClient } from 'react-query';
import { updateReview } from '../../api/review';
import { CacheEvent, updateMeCache, updateReviewsCache } from '../../utils/updateCache';

export const useUpdateReview = () => {
    const queryClient = useQueryClient();
    const authenticatedUpdateReview = useAuthenticatedMutation(updateReview);

    return useCallback(async (review) => {
        const result = await authenticatedUpdateReview(review);

        if (result !== undefined) {

            queryClient.setQueryData([QueryKey.REVIEW, result.id, 'read'], result);
            queryClient.removeQueries([QueryKey.REVIEW, result.id, 'edit']);

            updateReviewsCache(queryClient, result, null, CacheEvent.UPDATE);
            updateMeCache(queryClient, result, null, CacheEvent.UPDATE);
        }

        return result;

    }, [queryClient, authenticatedUpdateReview])
}