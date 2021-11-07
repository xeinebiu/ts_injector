export abstract class FeedRepository {
    public abstract getFeeds(): Promise<string[]>;
}
