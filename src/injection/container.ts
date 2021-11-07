import { ClassAlreadyInjectedError, ClassNotInjectedError, ScopeAlreadyExistsError } from '../error'
import { InjectableClassProp, ScopeProp } from './prop'
import { ClassOrAbstract } from './type'

/**
 * Holds & Provides injectable classes
 *
 * @author xeinebiu@gmail.com
 */
export class Container {
    private static injectableClasses: {
        injectable: InjectableClassProp<unknown>,
        singleton?: unknown
    }[] = [];

    private static scopes: { clazz: ClassOrAbstract, scope: ScopeProp }[] = []

    public static injectClass (injectable: InjectableClassProp<unknown>): void {
        const { prototype } = injectable.provide
        const exists = this.injectableClasses.find((x) => x.injectable.provide === prototype)

        if (exists) {
            throw new ClassAlreadyInjectedError(injectable.provide)
        }

        this.injectableClasses.push({
            injectable
        })
    }

    public static getClass<P, T> (
        parent: ClassOrAbstract<P>,
        injectable: ClassOrAbstract<T>
    ): T {
        const scopes = this.scopes.filter(x => x.clazz === parent)

        const exists = this.injectableClasses.find((x) => {
            const checkForScope = !!x.injectable.providedIn

            if (checkForScope) {
                return x.injectable.provide === injectable && scopes.some(s => s.scope.scope === x.injectable.providedIn)
            }

            return x.injectable.provide === injectable
        })

        if (!exists) {
            throw new ClassNotInjectedError(injectable)
        }

        if (exists.injectable.singleton && exists.singleton) {
            return exists.singleton as T
        }

        let instance: T

        if (exists.injectable.useClass) {
            // eslint-disable-next-line new-cap
            instance = new exists.injectable.useClass() as T
        } else if (exists.injectable.useValue) {
            instance = exists.injectable.useValue as T
        } else {
            // eslint-disable-next-line new-cap
            // @ts-ignore
            instance = new exists.injectable.provide() as T
        }

        if (exists.injectable.singleton) {
            exists.singleton = instance
        }

        return instance
    }

    public static setScope<T> (
        constructor: ClassOrAbstract<T>,
        prop: ScopeProp
    ) {
        const exists = this.scopes.find(x => x.clazz === constructor && x.scope.scope === prop.scope)
        if (exists) {
            throw new ScopeAlreadyExistsError(constructor, prop.scope)
        }

        this.scopes.push({
            clazz: constructor,
            scope: prop
        })
    }
}
