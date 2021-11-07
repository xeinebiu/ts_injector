
export type ClassType<T = unknown> = (new(...args: any[]) => T)

export type ClassOrAbstract<T = unknown> = ClassType<T> | (Function & { prototype: T });
