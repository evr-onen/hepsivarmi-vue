import { isNil } from 'es-toolkit'
import {isEmpty} from "es-toolkit/compat";

/**
 * Checks if all provided arguments are present (not null, undefined, empty, or falsy)
 * Handles arrays, objects, strings, numbers, booleans, and other types
 *
 * @param args - Any number of arguments to check
 * @returns true if all arguments are present/valid, false otherwise
 */
const AreAllPresent = (...args: unknown[]): boolean => {
    return args.every(arg => {
        // null or undefined check
        if (isNil(arg)) return false

        // Array check - must have length and at least one non-empty item
        if (Array.isArray(arg)) {
            return !isEmpty(arg) && arg.some(item => AreAllPresent(item))
        }

        // Object check - must not be empty
        if (typeof arg === 'object') {
            return !isEmpty(arg)
        }

        // String check - must not be empty or whitespace only
        if (typeof arg === 'string') {
            return arg.trim().length > 0
        }

        // Number check - must not be NaN, 0 is considered valid
        if (typeof arg === 'number') {
            return !isNaN(arg)
        }

        // Boolean - both true and false are valid
        if (typeof arg === 'boolean') {
            return true
        }

        // For other types, just check truthiness
        return Boolean(arg)
    })
}

export default AreAllPresent