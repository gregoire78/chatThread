import BaseAPI from '../BaseAPI';
import ChattersList from './ChattersList';
import { UserIdResolvable, UserNameResolvable } from '../../Toolkit/UserTools';
import ChannelEvent from './ChannelEvent';
/**
 * Different API methods that are not officially supported by Twitch.
 *
 * Can be accessed using `client.unsupported` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const events = await client.unsupported.getEvents('125328655');
 * ```
 */
export default class UnsupportedAPI extends BaseAPI {
    /**
     * Retrieves a list of chatters in the Twitch chat of the given channel.
     *
     * **WARNING**: In contrast to most other methods, this takes a channel *name*, not a user ID.
     *
     * @param channel The channel to retrieve the chatters for.
     */
    getChatters(channel: UserNameResolvable): Promise<ChattersList>;
    /**
     * Retrieves a list of event planned for the given channel.
     *
     * @param channel The channel to retrieve the events for.
     */
    getEvents(channel: UserIdResolvable): Promise<ChannelEvent[]>;
}