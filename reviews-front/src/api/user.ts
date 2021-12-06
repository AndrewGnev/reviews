import { isUser, User } from './data/User';
import axios from 'axios';
import { baseUrl } from '../config';
import { ApiError, ApiErrorType } from './ApiError';

export const getMe = (token: string | undefined) => async (): Promise<User | undefined> => {
    if (!token) {
        return;
    }

    try {
        const { data } = await axios.get(`${baseUrl}/api/users/me`, { headers: { 'Authorization': `Bearer ${token}` } });

        if (isUser(data)) {
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