import { Review } from '../../api/data/Review';
import { useQuery } from 'react-query';
import { QueryKey } from '../../queryClient';
import { searchReview } from '../../api/review';

export interface UseSearchReviewsResult {
    reviews: Review[] | undefined;
    isLoading: boolean;
}

export const useSearchReviews = (text: string): UseSearchReviewsResult => {
    const { data: reviews, isLoading } = useQuery([QueryKey.FOUND_REVIEWS, text], searchReview(text), {
        retry: false, staleTime: Infinity
    });

    return { reviews, isLoading }
}