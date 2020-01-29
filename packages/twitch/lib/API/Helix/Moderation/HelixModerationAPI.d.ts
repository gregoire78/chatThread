import { UserIdResolvable } from '../../../Toolkit/UserTools';
import BaseAPI from '../../BaseAPI';
import HelixPaginatedRequest from '../HelixPaginatedRequest';
import HelixPaginatedResult from '../HelixPaginatedResult';
import { HelixForwardPagination } from '../HelixPagination';
import HelixBan, { HelixBanData } from './HelixBan';
import HelixBanEvent, { HelixBanEventData } from './HelixBanEvent';
import HelixModerator, { HelixModeratorData } from './HelixModerator';
import HelixModeratorEvent, { HelixModeratorEventData } from './HelixModeratorEvent';
/**
 * Filters for the banned users request.
 */
export interface HelixBanFilter extends HelixForwardPagination {
    /**
     * A user ID or a list thereof.
     */
    userId: string | string[];
}
/**
 * Filters for the moderators request.
 */
interface HelixModeratorFilter extends HelixForwardPagination {
    /**
     * A user ID or a list thereof.
     */
    userId: string | string[];
}
/**
 * The Helix API methods that deal with moderation.
 *
 * Can be accessed using `client.helix.moderation` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const game = await client.helix.moderation.getBannedUsers('61369223');
 * ```
 */
export default class HelixModerationAPI extends BaseAPI {
    /**
     * Retrieves a list of banned users in a given channel.
     *
     * @param channel The channel to retrieve the banned users from.
     * @param filter Additional filters for the result set.
     */
    getBannedUsers(channel: UserIdResolvable, filter?: HelixBanFilter): Promise<HelixPaginatedResult<HelixBan>>;
    /**
     * Creates a paginator for banned users in a given channel.
     *
     * @param channel The channel to retrieve the banned users from.
     */
    getBannedUsersPaginated(channel: UserIdResolvable): HelixPaginatedRequest<HelixBanData, HelixBan>;
    /**
     * Checks whether a given user is banned in a given channel.
     *
     * @param channel The channel to check for a ban of the given user.
     * @param user The user to check for a ban in the given channel.
     */
    checkUserBan(channel: UserIdResolvable, user: UserIdResolvable): Promise<boolean>;
    /**
     * Retrieves a list of ban events for a given channel.
     *
     * @param channel The channel to retrieve the ban events from.
     * @param filter Additional filters for the result set.
     */
    getBanEvents(channel: UserIdResolvable, filter?: HelixBanFilter): Promise<{
        data: HelixBanEvent[];
        cursor: string | undefined;
    }>;
    /**
     * Creates a paginator for ban events for a given channel.
     *
     * @param channel The channel to retrieve the ban events from.
     */
    getBanEventsPaginated(channel: UserIdResolvable): HelixPaginatedRequest<HelixBanEventData, HelixBanEvent>;
    /**
     * Retrieves a list of moderators in a given channel.
     *
     * @param channel The channel to retrieve moderators from.
     * @param filter Additional filters for the result set.
     */
    getModerators(channel: UserIdResolvable, filter?: HelixModeratorFilter): Promise<HelixPaginatedResult<HelixModerator>>;
    /**
     * Creates a paginator for moderators in a given channel.
     *
     * @param channel The channel to retrieve moderators from.
     */
    getModeratorsPaginated(channel: UserIdResolvable): HelixPaginatedRequest<HelixModeratorData, HelixModerator>;
    /**
     * Checks whether a given user is a moderator of a given channel.
     *
     * @param channel The channel to check.
     * @param user The user to check.
     */
    checkUserMod(channel: UserIdResolvable, user: UserIdResolvable): Promise<boolean>;
    /**
     * Retrieves a list of moderator events for a given channel.
     *
     * @param channel The channel to retrieve the moderator events from.
     * @param filter Additional filters for the result set.
     */
    getModeratorEvents(channel: UserIdResolvable, filter?: HelixModeratorFilter): Promise<{
        data: HelixModeratorEvent[];
        cursor: string | undefined;
    }>;
    /**
     * Creates a paginator for moderator events for a given channel.
     *
     * @param channel The channel to retrieve the moderator events from.
     */
    getModeratorEventsPaginated(channel: UserIdResolvable): HelixPaginatedRequest<HelixModeratorEventData, HelixModeratorEvent>;
}
export {};
