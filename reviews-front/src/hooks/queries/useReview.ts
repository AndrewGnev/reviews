import { Review } from '../../api/data/Review';
import { getReview } from '../../api/review';
import { useAuthenticatedQuery } from '../useAuthenticatedQuery';
import { QueryKey } from '../../queryClient';

export interface useGetReviewResult {
    review: Review | undefined;
    isLoading: boolean;
}

export const useReview = (reviewId: string, mode: string): useGetReviewResult => {

    const {data: review, isLoading} = useAuthenticatedQuery([QueryKey.REVIEW, reviewId, mode], getReview(+reviewId, mode === 'edit'), {
        staleTime: Infinity,
    })

    return { review, isLoading }
}