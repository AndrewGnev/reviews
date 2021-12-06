import { isReview, Review } from './Review';
import { checkTypesByKeys } from '../../utils/checkTypesByKeys';
import { isArrayOf } from '../../utils/isArrayOf';

export interface User {
    id: number;
    username: string;
    provider: string;
    reviews: Review[];
}

export const isUser = (user: unknown): user is User => {
    if (typeof user !== 'object' || user === null) {
        return false;
    }

    if (!checkTypesByKeys(user, {
        id: 'number',
        username: 'string',
        provider: 'string',
        reviews: 'object',
    })) {
        return false;
    }

    if (!isArrayOf(user.reviews, isReview)) {
        return false;
    }

    return true;
};