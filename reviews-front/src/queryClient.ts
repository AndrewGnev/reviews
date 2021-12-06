import { QueryClient } from 'react-query';


export enum QueryKey {
    ME = 'me',
    REVIEW = 'review',
    REVIEWS = 'reviews',
    CATEGORIES = 'categories',
    FOUND_REVIEWS = 'found_reviews',
}

export const queryClient = new QueryClient();