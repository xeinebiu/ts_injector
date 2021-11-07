import { ClassOrAbstract } from '../injection/type'

/**
 * Error thrown whether there is no provider for injected property
 *
 * @author xeinebiu@gmail.com
 */
export class ClassNotInjectedError extends Error {
    constructor (public readonly clazz: ClassOrAbstract) {
        super(`Class {${clazz.constructor.name}} is not injected!`)
    }
}
