import { UserIdResolvable } from '../../../Toolkit/UserTools';
import BaseAPI from '../../BaseAPI';
import Stream, { StreamType } from './Stream';
/**
 * The API methods that deal with streams.
 *
 * Can be accessed using `client.kraken.streams` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const stream = await client.kraken.streams.getStreamByChannel('125328655');
 * ```
 */
export default class StreamAPI extends BaseAPI {
    /**
     * Retrieves the current stream on the given channel.
     *
     * @param channel
     */
    getStreamByChannel(channel: UserIdResolvable): Promise<Stream | null>;
    /**
     * Retrieves a list of streams.
     *
     * @param channels A channel ID or a list thereof.
     * @param game Show only streams playing a certain game.
     * @param languageCode Show only streams in a certain language.
     * @param type Show only streams of a certain type.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    getStreams(channels?: string | string[], game?: string, languageCode?: string, type?: StreamType, page?: number, limit?: number): Promise<Stream[]>;
    /**
     * Retrieves a list of all streams.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    getAllStreams(page?: number, limit?: number): Promise<Stream[]>;
    /**
     * Retrieves a list of all live streams.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    getAllLiveStreams(page?: number, limit?: number): Promise<Stream[]>;
    /**
     * Retrieves a list of all streams on channels the currently authenticated user is following.
     *
     * @param type Show only streams of a certain type.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    getFollowedStreams(type?: StreamType, page?: number, limit?: number): Promise<Stream[]>;
}
