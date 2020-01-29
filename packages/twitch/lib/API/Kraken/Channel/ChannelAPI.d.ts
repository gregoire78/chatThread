import BaseAPI from '../../BaseAPI';
import Channel from './Channel';
import { UserIdResolvable } from '../../../Toolkit/UserTools';
import ChannelSubscription from './ChannelSubscription';
import PrivilegedChannel, { PrivilegedChannelData } from './PrivilegedChannel';
import User from '../User/User';
import ChannelFollow from './ChannelFollow';
/**
 * Channel data to update using {@ChannelAPI#updateChannel}.
 */
export interface ChannelUpdateData {
    /**
     * The status/title of the channel.
     */
    status?: string;
    /**
     * The currently played game.
     */
    game?: string;
    /**
     * The desired delay of the stream.
     */
    delay?: number;
    /**
     * Whether or not to show the channel feed.
     */
    channel_feed_enabled?: boolean;
}
/**
 * The possible lengths of a channel commercial.
 */
export declare type CommercialLength = 30 | 60 | 90 | 120 | 150 | 180;
/**
 * The API methods that deal with channels.
 *
 * Can be accessed using `client.kraken.channels` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const channel = await client.kraken.channels.getMyChannel();
 * ```
 */
export default class ChannelAPI extends BaseAPI {
    /**
     * Gets the channel the client is logged in to.
     */
    getMyChannel(): Promise<PrivilegedChannel>;
    /**
     * Retrieves the channel for the given user.
     *
     * @param user The user you want to retrieve the channel for.
     */
    getChannel(user: UserIdResolvable): Promise<Channel>;
    /**
     * Updates the given channel with the given data.
     *
     * @param channel The channel you want to update.
     * @param data The updated channel data.
     */
    updateChannel(channel: UserIdResolvable, data: ChannelUpdateData): Promise<void>;
    /**
     * Retrieves the list of users that have editor rights to the given channel.
     *
     * @param channel The channel you want to retrieve the list of editors for.
     */
    getChannelEditors(channel: UserIdResolvable): Promise<User[]>;
    /**
     * Retrieves the list of followers of the given channel.
     *
     * @param channel The channel you want to retrieve the list of followers of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    getChannelFollowers(channel: UserIdResolvable, page?: number, limit?: number, orderDirection?: 'asc' | 'desc'): Promise<ChannelFollow[]>;
    /**
     * Retrieves the list of subscribers of the given channel.
     *
     * @param channel The channel you want to retrieve the list of subscribers of.
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    getChannelSubscriptions(channel: UserIdResolvable, page?: number, limit?: number, orderDirection?: 'asc' | 'desc'): Promise<ChannelSubscription[]>;
    /**
     * Retrieves the total number of subscribers for the given channel.
     *
     * @param channel The channel you want to retrieve the number of subscribers for.
     */
    getChannelSubscriptionCount(channel: UserIdResolvable): Promise<number>;
    /**
     * Retrieves the subscription data for the given user to a given channel.
     *
     * Throws if the channel doesn't have a subscription program or the user is not subscribed to it.
     *
     * This method requires access to the channel. If you only have access to the user,
     * use {@UserAPI#getSubscriptionData} instead.
     *
     * @param channel The channel to check the subscription to.
     * @param byUser The user to check the subscription for.
     */
    getChannelSubscriptionByUser(channel: UserIdResolvable, byUser: UserIdResolvable): Promise<ChannelSubscription | null>;
    /**
     * Starts a commercial in the given channel.
     *
     * @param channel The channel to start the commercial in.
     * @param length The length of the commercial.
     */
    startChannelCommercial(channel: UserIdResolvable, length: CommercialLength): Promise<void>;
    /**
     * Resets the given channel's stream key.
     *
     * @param channel The channel to reset the stream key for.
     */
    resetChannelStreamKey(channel: UserIdResolvable): Promise<PrivilegedChannelData>;
    private _getChannelSubscriptions;
}
