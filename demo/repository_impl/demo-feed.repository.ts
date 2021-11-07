import { FeedRepository } from '../repository/feed.repository'
import { DemoFeedApi } from './http/demo-feed.api'
import { Inject } from '../../src/injection/decorator'

export class DemoFeedRepository extends FeedRepository {
    @Inject()
    private readonly feedApi!: DemoFeedApi

    async getFeeds (): Promise<string[]> {
        return this.feedApi.getFeeds()
    }
}
