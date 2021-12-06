import axios from 'axios';
import { baseUrl } from '../config';
import { ApiError, ApiErrorType } from './ApiError';
import { isReview, Review } from './data/Review';

export const like = (token: string | undefined) => async (reviewId: number): Promise<Review |undefined> => {
    if(!token) {
        return;
    }

    try {
        const { data } = await axios.post(
            `${baseUrl}/api/reviews/${reviewId}/like`,
            null,
            {headers: { 'Authorization': `Bearer ${token}` }}
        );

        if (isReview(data)) {
            return data;
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response?.status === 403) {
                throw ApiError.typed(ApiErrorType.NEED_AUTH);
            }

            throw e;
        }
    }
}