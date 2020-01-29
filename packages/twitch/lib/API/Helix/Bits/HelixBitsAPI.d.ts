import BaseAPI from '../../BaseAPI';
import HelixBitsLeaderboard from './HelixBitsLeaderboard';
/**
 * The possible time periods for a bits leaderboard.
 */
export declare type HelixBitsLeaderboardPeriod = 'day' | 'week' | 'month' | 'year' | 'all';
/**
 * Filters for the bits leaderboard request.
 */
export interface HelixBitsLeaderboardQuery {
    /**
     * The number of leaderboard entries you want to retrieve.
     */
    count?: number;
    /**
     * The time period from which bits should count towards the leaderboard.
     *
     * The leaderboards reset with the start of a new period, e.g. the `week` leaderboards reset every Monday midnight PST.
     */
    period?: HelixBitsLeaderboardPeriod;
    /**
     * The time to retrieve the bits leaderboard for.
     */
    startDate?: Date;
    /**
     * The user ID to show.
     *
     * The leaderboard will be guaranteed to include this user and then have more users before and after that user.
     */
    contextUserId?: string;
}
/**
 * The Helix API methods that deal with bits.
 *
 * Can be accessed using `client.helix.bits` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const leaderboard = await client.helix.bits.getLeaderboard({ period: 'day' });
 * ```
 */
export default class HelixBitsAPI extends BaseAPI {
    /**
     * Gets a bits leaderboard of your channel.
     *
     * @expandParams
     */
    getLeaderboard(params?: HelixBitsLeaderboardQuery): Promise<HelixBitsLeaderboard>;
}