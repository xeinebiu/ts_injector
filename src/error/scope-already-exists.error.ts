import { ClassOrAbstract } from '../injection/type'

/**
 * Error thrown whether class is already registered on a scope
 *
 * @author xeinebiu@gmail.com
 */
export class ScopeAlreadyExistsError extends Error {
    constructor (
        public readonly clazz: ClassOrAbstract,
        public readonly scope?: string
    ) {
        super(`{${clazz.constructor.name}} it is already on scope {${scope}}!`)
    }
}
