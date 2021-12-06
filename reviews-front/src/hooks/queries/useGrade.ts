import { useQueryClient } from 'react-query';
import { useAuthenticatedMutation } from '../useAuthenticatedMutation';
import { addGrade } from '../../api/data/grade';
import { useCallback } from 'react';
import { QueryKey } from '../../queryClient';

export const useGrade = (): (reviewId: number, grade: number) => void => {

    const queryClient = useQueryClient();
    const authenticatedGrade = useAuthenticatedMutation(addGrade);

    return useCallback(async (reviewId, grade) => {
        const result = await authenticatedGrade(reviewId, grade);
        if (result !== undefined) {
            queryClient.setQueryData(QueryKey.REVIEW, result)
        }

    },[queryClient, authenticatedGrade])
}