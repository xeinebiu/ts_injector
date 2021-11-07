import { createDiModule } from '../src'
import { FeedRepository } from './repository/feed.repository'
import { DemoFeedRepository } from './repository_impl/demo-feed.repository'
import { Inject, Scope } from '../src/injection/decorator'
import { DemoFeedApi } from './repository_impl/http/demo-feed.api'

createDiModule({
    provides: [{
        singleton: true,
        provide: FeedRepository,
        providedIn: 'root',
        useClass: DemoFeedRepository
    }, {
        provide: DemoFeedApi,
        singleton: true
    }]
})

@Scope({
    scope: 'root'
})
class Demo {
    @Inject()
    private readonly feedRepository!: FeedRepository

    public async printFeeds (): Promise<void> {
        console.log(await this.feedRepository.getFeeds())
    }
}

new Demo().printFeeds()
