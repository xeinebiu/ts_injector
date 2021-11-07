import { ClassOrAbstract } from '../injection/type'

/**
 * Error thrown whether an injected property is being assigned outside injection
 *
 * @author xeinebiu@gmail.com
 */
export class PropertyInjectableProtectedError extends Error {
    constructor (
        public readonly clazz: ClassOrAbstract,
        public readonly propertyKey: string
    ) {
        super(`Injected property {${propertyKey}} on {${clazz.constructor.name}} cannot be assigned!`)
    }
}
