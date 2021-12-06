import { isUser, User } from './data/User';
import axios from 'axios';
import { baseUrl } from '../config';
import { ApiError, ApiErrorType } from './ApiError';
import { isArrayOf } from '../utils/isArrayOf';
import { isString } from '../utils/isString';

export const getCategories = (token: string | undefined) => async (): Promise<string[] | undefined> => {
    if (!token) {
        return;
    }

    try {
        const { data } = await axios.get(`${baseUrl}/api/reviews/categories`, { headers: { 'Authorization': `Bearer ${token}` } });

        if (isArrayOf(data, isString)) {
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