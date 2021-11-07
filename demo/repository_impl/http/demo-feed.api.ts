export class DemoFeedApi {
    async getFeeds (): Promise<string[]> {
        return ['Hello World', 'Demo Feed', 'Injection']
    }
}
