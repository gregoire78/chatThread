import TwitchClient, { TwitchAPICallOptions } from '../../TwitchClient';
import { HelixPaginatedResponse } from './HelixResponse';
/**
 * Represents a request to the new Twitch API (Helix) that utilizes a cursor to paginate through its results.
 *
 * Aside from the methods described below, you can also utilize the async iterator using `for await .. of`:
 *
 * ```ts
 * const result = client.helix.videos.getVideosByUser('125328655');
 * for await (const video of result) {
 *     console.log(video.title);
 * }
 * ```
 */
export default class HelixPaginatedRequest<D, T> {
    private readonly _callOptions;
    private readonly _mapper;
    private readonly _client;
    /** @private */
    protected _currentCursor?: string;
    /** @private */
    protected _isFinished: boolean;
    /** @private */
    protected _currentData?: HelixPaginatedResponse<D>;
    /** @private */
    constructor(_callOptions: TwitchAPICallOptions, client: TwitchClient, _mapper: (data: D) => T | T[]);
    /**
     * The last retrieved page of data associated to the requested resource.
     *
     * Only works with {@HelixPaginatedRequest#getNext} and not with any other methods of data retrieval.
     */
    get current(): D[] | undefined;
    /**
     * Retrieves and returns the next available page of data associated to the requested resource, or an empty array if there are no more available pages.
     */
    getNext(): Promise<T[]>;
    /**
     * Retrieves and returns all data associated to the requested resource.
     *
     * Be aware that this makes multiple calls to the Twitch API. Due to this, you might be more suspectible to rate limits.
     *
     * Also be aware that this resets the internal cursor, so avoid using this and {@HelixPaginatedRequest#getNext} together.
     */
    getAll(): Promise<T[]>;
    /**
     * Retrieves the current cursor.
     *
     * Only useful if you want to make manual requests to the API.
     */
    get currentCursor(): string | undefined;
    /**
     * Resets the internal cursor.
     *
     * This will make {@HelixPaginatedRequest#getNext} start from the first page again.
     */
    reset(): void;
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    /** @private */
    protected _fetchData(additionalOptions?: Partial<TwitchAPICallOptions>): Promise<HelixPaginatedResponse<D>>;
    /** @private */
    protected _processResult(result: HelixPaginatedResponse<D>): T[];
}
