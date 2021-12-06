import { checkTypesByKeys } from '../../utils/checkTypesByKeys';

export interface UserBasicInfo {
    id: number;
    username: string;
    provider: string;
}

export const isUserBasicInfo = (userBasicInfo: unknown): userBasicInfo is UserBasicInfo => {
    if (typeof userBasicInfo !== 'object' || userBasicInfo === null) {
        return false;
    }

    return checkTypesByKeys(userBasicInfo, {
        id: 'number',
        username: 'string',
        provider: 'string',
    });
};
