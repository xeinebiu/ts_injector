import { Container } from '../container'
import { ScopeProp } from '../prop'

/**
 * Use providers from specific scope
 *
 * @author xeinebiu@gmail.com
 */
export function Scope (prop: ScopeProp) {
    return function reportableClassDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
        Container.setScope(constructor, prop)
    }
}
