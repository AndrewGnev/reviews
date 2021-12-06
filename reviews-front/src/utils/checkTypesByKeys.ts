
export function checkTypesByKeys<K extends Record<string, string | string[] | undefined>>(object: object, keys: K)
    : object is { [K1 in keyof K]: unknown } {

    for (let key of Object.keys(keys)) {
        if (!(key in object)) {
            return false;
        }

        const keyType = keys[key];
        if (!keyType) {
            continue;
        }

        const types = Array.isArray(keyType) ? keyType : [keyType];
        if (!types.some(t => typeof (object as Record<string, unknown>)[key] === t)) {
            return false;
        }
    }

    return true;
}