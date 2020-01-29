import BaseAPI from '../../BaseAPI';
import Channel from '../Channel/Channel';
import Stream from '../Stream/Stream';
/**
 * The API methods that deal with searching.
 *
 * Can be accessed using `client.kraken.search` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const channel = await client.kraken.search.searchStreams('Hearthstone');
 * ```
 */
export default class SearchAPI extends BaseAPI {
    /**
     * Retrieves a list of channels that match the given search term.
     *
     * @param term The term you want to search for.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    searchChannels(term: string, page?: number, limit?: number): Promise<Channel[]>;
    /**
     * Retrieves a list of streams that match the given search term.
     *
     * @param term The term you want to search for.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param hls Whether you want only HLS or only non-HLS (RTMP) streams. If not set, finds both types of streams.
     */
    searchStreams(term: string, page?: number, limit?: number, hls?: boolean): Promise<Stream[]>;
}