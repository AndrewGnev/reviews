import { Review } from '../../api/data/Review';
import { useAuthenticatedQuery } from '../useAuthenticatedQuery';
import { queryClient, QueryKey } from '../../queryClient';
import { getReviews } from '../../api/review';

export interface useGetReviewsResult {
    reviews: Review[] | undefined;
    isLoading: boolean;
}

export const useReviews = (): useGetReviewsResult => {

    const { data: reviews, isLoading} = useAuthenticatedQuery(QueryKey.REVIEWS, getReviews, {
        staleTime: Infinity,
    })

    return { reviews, isLoading };
}