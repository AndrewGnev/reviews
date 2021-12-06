import { useQueryClient } from 'react-query';
import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { deleteReview } from '../../api/review';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';
import { User } from '../../api/data/User';

export const useDeleteReview = (): (reviewId: number) => void => {
    const queryClient = useQueryClient();
    const authenticatedDeleteReview = useAuthenticatedMutation(deleteReview);

    return useCallback(async (reviewId) => {
        const result: number | undefined = await authenticatedDeleteReview(reviewId);

        if (result !== undefined) {
            const me: User | undefined = queryClient.getQueryData(QueryKey.ME);

            if (me) {
                queryClient.setQueryData(QueryKey.ME, {
                    ...me,
                    reviews: me.reviews.filter(r => r.id !== result),
                });
            }
        }

    }, [queryClient, authenticatedDeleteReview]);
}