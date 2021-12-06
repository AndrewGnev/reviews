import { isReview, NewReview, Review, UploadingReview } from './data/Review';
import axios from 'axios';
import { baseUrl } from '../config';
import { ApiError, ApiErrorType } from './ApiError';
import { isArrayOf } from '../utils/isArrayOf';

export const getReview = (reviewId: number, markdown: boolean) => (token: string | undefined) => async (): Promise<Review | undefined> => {
    if (!token) {
        return;
    }

    try {
        const { data } = await axios.get(`${baseUrl}/api/reviews/${reviewId}`,
            { headers: { 'Authorization': `Bearer ${token}` }, params: { 'markdown': markdown} });

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

    throw new Error();
};

export const getReviews = (token: string | undefined) => async (): Promise<Review[] | undefined> => {
    if(!token) {
        return;
    }

    try {
        const { data } = await axios.get(`${baseUrl}/api/reviews`,
            {headers: { 'Authorization': `Bearer ${token}` },});

        if (isArrayOf(data, isReview)) {
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

    throw new Error();
}

export const updateReview = (token: string | undefined) => async (review: UploadingReview): Promise<Review | undefined> => {
    if(!token) {
        return;
    }

    try {
        const formData = new FormData();

        formData.append('id', review.id.toString());
        formData.append('tittle', review.tittle);
        formData.append('content', review.content);
        formData.append('grade', review.grade.toString());

        review.categories.forEach(category => formData.append('categories', category));
        review.tagsNames.forEach(tagName => formData.append('tagsNames', tagName));
        review.images.forEach(image => formData.append('images', image, image.name));

        const { data } = await axios.put(
            `${baseUrl}/api/reviews/${review.id}`,
            formData,
            { headers: { 'Authorization': `Bearer ${token}` } }
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

export const createReview = (token: string | undefined) => async (review: NewReview): Promise<Review | undefined> => {
    if(!token) {
        return;
    }

    try {
        const formData = new FormData();

        formData.append('tittle', review.tittle);
        formData.append('content', review.content);
        formData.append('grade', review.grade.toString());

        review.categories.forEach(category => formData.append('categories', category));
        review.tagsNames.forEach(tagName => formData.append('tagsNames', tagName));
        review.images.forEach(image => formData.append('images', image, image.name));

        const { data } = await axios.post(
            `${baseUrl}/api/reviews`,
            formData,
            { headers: { 'Authorization': `Bearer ${token}` } }
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

export const deleteReview = (token: string | undefined) => async (reviewId: number): Promise<number | undefined> => {
    if(!token) {
        return;
    }

    try {
        const { data } = await axios.delete(
            `${baseUrl}/api/reviews/${reviewId}`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (typeof data === 'number') {
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

export const searchReview = (text: string) => async (): Promise<Review[] | undefined> => {

    const { data } = await axios.get(
        `${baseUrl}/api/reviews/search`,
        { params: { 'text': text } }
    );

    if (isArrayOf(data, isReview)) {
        return data;
    }
}