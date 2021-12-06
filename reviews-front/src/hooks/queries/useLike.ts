import { useAuthenticatedQuery } from '../useAuthenticatedQuery';
import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { like } from '../../api/like';
import { useCallback } from 'react';
import { queryClient, QueryKey } from '../../queryClient';
import { useQueryClient } from 'react-query';

export const useLike = (): (reviewId: number) => void => {

    const queryClient = useQueryClient();
    const authenticatedLike = useAuthenticatedMutation(like);

    return useCallback(async (reviewId) => {
        const result = await authenticatedLike(reviewId);
        if (result !== undefined) {
            queryClient.setQueryData(QueryKey.REVIEW, result)
        }

    },[queryClient, authenticatedLike])
}