import { useQueryClient } from 'react-query';
import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { createReview } from '../../api/review';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';
import { User } from '../../api/data/User';
import { NewReview } from '../../api/data/Review';

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    const authenticatedCreateReview = useAuthenticatedMutation(createReview);

    return useCallback(async (review: NewReview) => {
        const result = await authenticatedCreateReview(review);

        if (result !== undefined) {
            queryClient.setQueryData(QueryKey.REVIEW, result);

            const me: User | undefined = queryClient.getQueryData(QueryKey.ME);

            if (me) {
                queryClient.setQueryData(QueryKey.ME, {
                    ...me,
                    reviews: [...me.reviews, result],
                });
            }
        }

        return result;
    }, [queryClient, authenticatedCreateReview])
}