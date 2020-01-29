import BaseAPI from '../BaseAPI';
import ChatBadgeList from './ChatBadgeList';
import { UserIdResolvable } from '../../Toolkit/UserTools';
/**
 * The API methods that deal with badges.
 *
 * Can be accessed using `client.badges` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const cheermotes = await client.badges.getGlobalBadges();
 * ```
 */
export default class BadgesAPI extends BaseAPI {
    /**
     * Retrieves all globally applicable chat badges.
     */
    getGlobalBadges(language?: String): Promise<ChatBadgeList>;
    /**
     * Retrieves all applicable chat badges for a given channel.
     *
     * @param channel The channel to retrieve the chat badges for.
     * @param includeGlobal Whether to include global badges in the result list.
     */
    getChannelBadges(channel: UserIdResolvable, includeGlobal?: boolean, language?: String): Promise<ChatBadgeList>;
}