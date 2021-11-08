## Typescript Injector
![](https://img.shields.io/badge/minzipped%20size-7%20kb-green)
![](https://img.shields.io/badge/build-passing-green)
![](https://img.shields.io/badge/Typescript-100%25-green)
![](https://img.shields.io/badge/License-MIT-green)

Simple and lightweight injector for typescript projects.

---

## Installation
``
npm install @xeinebiu/ts_injector@1.0.0
``

## Modules
Module allows you to ``provide`` classes when they are requested via `injection`

````typescript
createDiModule({
    provides: [{
        provide: FeedRepository
    }]
})
````
On the example above, we are providing `FeedRepository` on any `scope` required.

Now, to use it, simply annotate the property with ```@Inject()```

````typescript
class Demo {
    
    @Inject()
    private readonly feedRepository!: FeedRepository
}
````

---

## Providers

### Singleton

To make the ``FeedRepository`` a singleton, simply add `singleton: true`

``FeedReposiotory`` class must not be `abstract`

````typescript
createDiModule({
    provides: [{
        provide: FeedRepository,
        singleton: true
    }]
})
````
### Use Class
Whether your project is built in on abstraction, the following example can be used.
```typescript
createDiModule({
    provides: [{
        singleton: true,
        provide: FeedRepository,    // can also be abstract when used with `useClass`
        useClass: DemoFeedRepository
    }]
})
```
```DemoFeedRepository``` will be provided for `FeedRepository`. Since we are setting `singleton: true`, a single instance is shared.

### Use Value
Provide a class instance for requested provider.
```typescript
createDiModule({
    provides: [{
        provide: FeedRepository,    // can also be abstract when used with `useValue`
        useValue: new DemoFeedRepository(...arguments)
    }]
})
```
When ``useValue`` is used, singleton is set by default to `true`

---

## Scope
Using ```scope``` allows providing different classes on specific scope.
````typescript
createDiModule({
    provides: [{
        provide: FeedRepository,
        useClass: RootFeedRepository,
        provideIn: 'root'
    }]
})
````
It is a must to annotate the class where the scope is needed.
````typescript
@Scope({
    scope: 'root'
})
class RootDemo {

    @Inject()
    private readonly feedRepository!: FeedRepository
}
````
``feedRepository`` on `RootDemo` is provided with `RootFeedRepository`
