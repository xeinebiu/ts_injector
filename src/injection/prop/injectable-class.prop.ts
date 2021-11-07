import { ClassOrAbstract, ClassType } from '../type'

/**
 * Represent single class provided via injectable
 *
 * @author xeinebiu@gmail.com
 */
export interface InjectableClassProp<T> {

    /**
     * Whether the [T] its a singleton.
     */
    singleton?: boolean;

    /**
     * The scope container to provide the [T]
     */
    providedIn?: string;

    /**
     * Class provided via inject
     */
    provide: ClassOrAbstract<T>;

    /**
     * The value provided
     */
    useValue?: T;

    /**
     * Provide the class [T]
     */
    useClass?: ClassType<T>
}
