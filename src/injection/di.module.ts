import { InjectableClassProp } from './prop'
import { Container } from './container'

export interface DiModuleProp<T> {

    /**
     *
     */
    provides: InjectableClassProp<T>[]
}

export const createDiModule = <T>(prop: DiModuleProp<T>) => {
    prop.provides.forEach(provide => {
        Container.injectClass(provide)
    })
}
