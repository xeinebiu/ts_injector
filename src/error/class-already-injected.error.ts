import { ClassOrAbstract } from '../injection/type'

/**
 * Error thrown whether the same class has more than 1 Provider
 *
 * @author xeinebiu@gmail.co
 */
export class ClassAlreadyInjectedError extends Error {
    constructor (public readonly clazz: ClassOrAbstract) {
        super(`Class {${clazz.constructor.name}} is already injected!`)
    }
}
