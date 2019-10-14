
/**
 * Check whether the passed value is a valid object
 * @param obj The value to check
 * @returns boolean
 */
export const isValidObject = (obj: any) => {
    return obj && typeof obj === 'object';
};

/**
 * Check whether the passed value is a valid date
 * @param value The value to check
 * @returns boolean
 */
export const isValidDate = (value: any) => {
    const date: any = new Date(value);
    return !isNaN(date) && date instanceof Date ;
};

/**
 * Check whether the passed string is true boolean
 * @param value The string to check
 * @returns boolean
 */
export const isTrueBool = (value: string) => {
    return value === 'true';
};

/**
 * Check whether the passed string is true boolean
 * @param value The string to check
 * @returns boolean
 */
export const isFalseBool = (value: string) => {
    return value === 'false';
};