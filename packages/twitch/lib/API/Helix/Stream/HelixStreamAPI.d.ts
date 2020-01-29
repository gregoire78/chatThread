import { UserIdResolvable, UserNameResolvable } from '../../../Toolkit/UserTools';
import BaseAPI from '../../BaseAPI';
import HelixPaginatedRequest from '../HelixPaginatedRequest';
import HelixPaginatedResult from '../HelixPaginatedResult';
import HelixPagination from '../HelixPagination';
import HelixStream, { HelixStreamData, HelixStreamType } from './HelixStream';
import HelixStreamMarker from './HelixStreamMarker';
import HelixStreamMarkerWithVideo, { HelixStreamMarkerVideoData } from './HelixStreamMarkerWithVideo';
/**
 * Filters for the streams request.
 */
export interface HelixStreamFilter {
    /**
     * A community ID or a list thereof.
     */
    community?: string | string[];
    /**
     * A game ID or a list thereof.
     */
    game?: string | string[];
    /**
     * A language or a list thereof.
     */
    language?: string | string[];
    /**
     * A type of stream.
     */
    type?: HelixStreamType;
    /**
     * A user ID or a list thereof.
     */
    userId?: string | string[];
    /**
     * A user name or a list thereof.
     */
    userName?: string | string[];
}
/**
 * @inheritDoc
 */
export interface HelixPaginatedStreamFilter extends HelixStreamFilter, HelixPagination {
}
/** @private */
interface HelixStreamGetMarkersResultVideo {
    video_id: string;
    markers: HelixStreamMarkerVideoData[];
}
/** @private */
interface HelixStreamGetMarkersResult {
    user_id: string;
    user_name: string;
    videos: HelixStreamGetMarkersResultVideo[];
}
/**
 * The Helix API methods that deal with streams.
 *
 * Can be accessed using `client.helix.streams` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const stream = await client.helix.streams.getStreamByUserId('125328655');
 * ```
 */
export default class HelixStreamAPI extends BaseAPI {
    /**
     * Retrieves a list of streams.
     *
     * @expandParams
     */
    getStreams(filter?: HelixPaginatedStreamFilter): Promise<HelixPaginatedResult<HelixStream>>;
    /**
     * Creates a paginator for streams.
     *
     * @expandParams
     */
    getStreamsPaginated(filter?: HelixStreamFilter): HelixPaginatedRequest<HelixStreamData, HelixStream>;
    /**
     * Retrieves the current stream for the given user name.
     *
     * @param user The user name to retrieve the stream for.
     */
    getStreamByUserName(user: UserNameResolvable): Promise<HelixStream | null>;
    /**
     * Retrieves the current stream for the given user ID.
     *
     * @param user The user ID to retrieve the stream for.
     */
    getStreamByUserId(user: UserIdResolvable): Promise<HelixStream | null>;
    /**
     * Retrieves a list of all stream markers for an user.
     *
     * @param user The user to list the stream markers for.
     */
    getStreamMarkersForUser(user: UserIdResolvable): Promise<HelixPaginatedResult<HelixStreamMarkerWithVideo>>;
    /**
     * Creates a paginator for all stream markers for an user.
     *
     * @param user The user to list the stream markers for.
     */
    getStreamMarkersForUserPaginated(user: UserIdResolvable): HelixPaginatedRequest<HelixStreamGetMarkersResult, HelixStreamMarkerWithVideo>;
    /**
     * Retrieves a list of all stream markers for a video.
     *
     * @param videoId The video to list the stream markers for.
     */
    getStreamMarkersForVideo(videoId: string): Promise<HelixPaginatedResult<HelixStreamMarkerWithVideo>>;
    /**
     * Creates a paginator for all stream markers for a video.
     *
     * @param videoId The video to list the stream markers for.
     */
    getStreamMarkersForVideoPaginated(videoId: string): HelixPaginatedRequest<HelixStreamGetMarkersResult, HelixStreamMarkerWithVideo>;
    /**
     * Creates a new stream marker.
     *
     * Only works while your stream is live.
     */
    createStreamMarker(): Promise<HelixStreamMarker>;
    private _getStreamMarkers;
    private _getStreamMarkersPaginated;
    private static _mapGetStreamMarkersResult;
}
export {};
