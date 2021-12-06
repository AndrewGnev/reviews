import { isReview, Review } from './Review';
import axios from 'axios';
import { baseUrl } from '../../config';
import { ApiError, ApiErrorType } from '../ApiError';

export const addGrade = (token: string | undefined) => async (reviewId: number, grade: number): Promise<Review |undefined> => {
    if(!token) {
        return;
    }

    try {
        const { data } = await axios.post(
            `${baseUrl}/api/reviews/${reviewId}/grade`,
            grade,
            {headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }}
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