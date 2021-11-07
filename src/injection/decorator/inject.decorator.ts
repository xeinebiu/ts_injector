import { Container } from '../container'
import 'reflect-metadata'
import { PropertyInjectableProtectedError } from '../../error'

/**
 * Provide the value via injection
 *
 * @author xeinebiu@gmail.com
 */
export const Inject = () => {
    return function (target: Object, propertyKey: string) {
        const type = Reflect.getMetadata('design:type', target, propertyKey)
        let value: unknown | undefined

        const getter = () => {
            if (value) return value

            value = Container.getClass(target.constructor as new() => unknown, type)

            return value
        }

        const setter = () => {
            throw new PropertyInjectableProtectedError(target as new() => unknown, propertyKey)
        }

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        })
    }
}
