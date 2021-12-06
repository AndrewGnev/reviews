import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';
import { useQueryClient } from 'react-query';
import { UploadingReview } from '../../api/data/Review';
import { updateReview } from '../../api/review';
import { User } from '../../api/data/User';

export const useUpdateReview = () => {
    const queryClient = useQueryClient();
    const authenticatedUpdateReview = useAuthenticatedMutation(updateReview);

    return useCallback(async (review) => {
        const result = await authenticatedUpdateReview(review);

        if (result !== undefined) {
            queryClient.setQueryData(QueryKey.REVIEW, result);

            const me: User | undefined = queryClient.getQueryData(QueryKey.ME);

            if (me) {
                queryClient.setQueryData(QueryKey.ME, {
                    ...me,
                    reviews: me.reviews.map(r => {
                        return r.id === result.id ? result : r;
                    }),
                });
            }
        }

        return result;

    }, [queryClient, authenticatedUpdateReview])
}