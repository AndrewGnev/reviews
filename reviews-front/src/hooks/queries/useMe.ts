import { User } from '../../api/data/User';
import { useAuthenticatedQuery } from '../useAuthenticatedQuery';
import { QueryKey } from '../../queryClient';
import { getMe } from '../../api/user';

export interface UseMeResult {
    me: User | undefined;
    isLoading: boolean;
}

export const useMe = (): UseMeResult => {

    const {data: me, isLoading} = useAuthenticatedQuery(QueryKey.ME, getMe, {
        staleTime: Infinity,
    });

    return { me, isLoading }
}

