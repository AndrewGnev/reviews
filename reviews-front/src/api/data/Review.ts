import { isUserBasicInfo, UserBasicInfo } from './UserBasicInfo';
import { checkTypesByKeys } from '../../utils/checkTypesByKeys';
import { isArrayOf } from '../../utils/isArrayOf';
import { isString } from '../../utils/isString';

export interface Review {
    id: number;
    author: UserBasicInfo;
    tittle: string;
    content: string;
    grade: number;
    categories: string[];
    likesCount: number;
    usersGradesAvg: number;
    tagsNames: string[];
    imagesUrls: string[];
}

export interface UploadingReview {
    id: number;
    tittle: string;
    content: string;
    grade: number;
    categories: string[];
    tagsNames: string[];
    images: File[];
}

export interface NewReview {
    tittle: string;
    content: string;
    grade: number;
    categories: string[];
    tagsNames: string[];
    images: File[];
}

export const isReview = (review: unknown): review is Review => {

    if (typeof review !== 'object' || review === null) {
        return false;
    }

    if (!checkTypesByKeys(review, {
        id: 'number',
        author: 'object',
        tittle: 'string',
        content: 'string',
        grade: 'number',
        categories: 'object',
        likesCount: 'number',
        usersGradesAvg: ['object', 'number'],
        tagsNames: 'object',
        imagesUrls: 'object',
    })) {
        return false;
    }

    if (review.usersGradesAvg !== null && (typeof review.usersGradesAvg !== 'number')) {
        return false;
    }

    if (!isArrayOf(review.categories, isString)) {
        return false;
    }

    if (!isArrayOf(review.tagsNames, isString)) {
        return false;
    }

    if (!isArrayOf(review.imagesUrls, isString)) {
        return false;
    }

    if (!isUserBasicInfo(review.author)) {
        return false;
    }

    return true;
}