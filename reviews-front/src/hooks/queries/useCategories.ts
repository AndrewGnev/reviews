import { useAuthenticatedQuery } from '../useAuthenticatedQuery';
import { QueryKey } from '../../queryClient';
import { getCategories } from '../../api/categories';

export interface UseCategoriesResult {
    categories: string[] | undefined;
    isLoading: boolean;
}

export const useCategories = (): UseCategoriesResult => {

    const {data: categories, isLoading} = useAuthenticatedQuery(QueryKey.CATEGORIES, getCategories, {
        staleTime: Infinity,
    });

    return { categories, isLoading }
}
