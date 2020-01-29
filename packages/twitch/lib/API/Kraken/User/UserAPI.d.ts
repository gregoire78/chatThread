import { UserIdResolvable } from '../../../Toolkit/UserTools';
import BaseAPI from '../../BaseAPI';
import EmoteSetList from '../Channel/EmoteSetList';
import PrivilegedUser from './PrivilegedUser';
import User from './User';
import UserBlock from './UserBlock';
import UserChatInfo from './UserChatInfo';
import UserFollow from './UserFollow';
import UserSubscription from './UserSubscription';
/**
 * The API methods that deal with users.
 *
 * Can be accessed using `client.kraken.users` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const user = await client.kraken.users.getUser('125328655');
 * ```
 */
export default class UserAPI extends BaseAPI {
    private readonly _userByNameCache;
    /**
     * Retrieves the user data of the currently authenticated user.
     */
    getMe(): Promise<PrivilegedUser>;
    /**
     * Retrieves the user data for the given user ID.
     *
     * @param userId The user ID you want to look up.
     */
    getUser(userId: UserIdResolvable): Promise<User>;
    /**
     * Retrieves the user data for the given user name.
     *
     * @param userName The user name you want to look up.
     */
    getUserByName(userName: string): Promise<User | null>;
    /**
     * Retrieves the user data for the given user names.
     *
     * @param userNames The user names you want to look up.
     */
    getUsersByNames(userNames: string[]): Promise<Record<string, User>>;
    /**
     * Retrieves information about the user's chat appearance and privileges.
     *
     * @param user The user you want to get chat info for.
     */
    getChatInfo(user: UserIdResolvable): Promise<UserChatInfo>;
    /**
     * Retrieves the emotes a given user can use.
     *
     * @param user The user you want to get emotes for.
     */
    getUserEmotes(user: UserIdResolvable): Promise<EmoteSetList>;
    /**
     * Retrieves the subscription data for a given user to a given channel.
     *
     * @param user The user to retrieve the subscription data of.
     * @param toChannel The channel you want to retrieve the subscription data to.
     */
    getSubscriptionData(user: UserIdResolvable, toChannel: UserIdResolvable): Promise<UserSubscription | null>;
    /**
     * Get a list of channels a given user follows.
     *
     * @param user The user you want to retrieve the follows of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderBy The field to order by.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    getFollowedChannels(user: UserIdResolvable, page?: number, limit?: number, orderBy?: string, orderDirection?: 'asc' | 'desc'): Promise<UserFollow[]>;
    /**
     * Get follow data for a given user to a given channel.
     *
     * @param user The user you want to retrieve follow data of.
     * @param channel The channel you want to retrieve follow data to.
     */
    getFollowedChannel(user: UserIdResolvable, channel: UserIdResolvable): Promise<UserFollow | null>;
    /**
     * Follows a given channel with a given user.
     *
     * @param user The user you want to follow with.
     * @param channel The channel to follow.
     * @param notifications Whether the user will receive notifications.
     */
    followChannel(user: UserIdResolvable, channel: UserIdResolvable, notifications?: boolean): Promise<UserFollow>;
    /**
     * Unfollows a given channel with a given user.
     *
     * @param user The user you want to unfollow with.
     * @param channel The channel to unfollow.
     */
    unfollowChannel(user: UserIdResolvable, channel: UserIdResolvable): Promise<void>;
    /**
     * Retrieves a list of users a given user has blocked.
     *
     * @param user The user you want to retrieve the block list of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    getBlockedUsers(user: UserIdResolvable, page?: number, limit?: number): Promise<UserBlock[]>;
    /**
     * Blocks a given user with another given user.
     *
     * @param user The user you want to block with.
     * @param userToBlock The user to block.
     */
    blockUser(user: UserIdResolvable, userToBlock: UserIdResolvable): Promise<UserBlock>;
    /**
     * Unblocks a given user with another given user.
     *
     * @param user The user you want to unblock with.
     * @param userToUnblock The user to unblock.
     */
    unblockUser(user: UserIdResolvable, userToUnblock: UserIdResolvable): Promise<void>;
    private _cleanUserCache;
}
