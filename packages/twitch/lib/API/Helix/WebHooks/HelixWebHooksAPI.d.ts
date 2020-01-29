import { UserIdResolvable } from '../../../Toolkit/UserTools';
import BaseAPI from '../../BaseAPI';
import HelixPaginatedRequestWithTotal from '../HelixPaginatedRequestWithTotal';
import HelixWebHookSubscription, { HelixWebHookSubscriptionData } from './HelixWebHookSubscription';
/**
 * The properties describing where and how long a WebHook notification is sent, and how it is signed.
 */
export interface HelixWebHookHubRequestOptions {
    /**
     * The URL to send notifications to.
     */
    callbackUrl: string;
    /**
     * The number of seconds the subscription is valid for. Defaults to 3600 (1 hour). Can be at most 864000 (10 days).
     */
    validityInSeconds?: number;
    /**
     * The secret to sign the notification payloads with.
     */
    secret?: string;
}
/**
 * The properties describing the WebHook to create or remove.
 *
 * @inheritDoc
 */
export interface HelixWebHookHubRequest extends HelixWebHookHubRequestOptions {
    /**
     * Whether to subscribe or unsubscribe from notifications.
     */
    mode: HubMode;
    /**
     * What topic URL to subscribe to or unsubscribe from.
     */
    topicUrl: string;
    /**
     * The OAuth scope necessary to subscribe to or unsubscribe from the given topic.
     */
    scope?: string;
}
/**
 * Whether to subscribe or unsubscribe from notifications.
 */
export declare type HubMode = 'subscribe' | 'unsubscribe';
/**
 * The API methods that deal with WebHooks.
 *
 * Can be accessed using `client.helix.webHooks` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const accepted = await client.helix.webHooks.subscribeHook('https://api.twitch.tv/helix/streams?user_id=125328655', 'https://example.com');
 * ```
 */
export default class HelixWebHooksAPI extends BaseAPI {
    /**
     * Retrieves the current WebHook subscriptions for the current client.
     *
     * Requires an app access token to work; does not work with user tokens.
     */
    getSubscriptions(): Promise<HelixPaginatedRequestWithTotal<HelixWebHookSubscriptionData, HelixWebHookSubscription>>;
    /**
     * Sends an arbitrary request to subscribe to or unsubscribe from an event.
     *
     * @expandParams
     */
    sendHubRequest(options: HelixWebHookHubRequest): Promise<void>;
    /**
     * Subscribes to events representing a user following other users.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about the users they will follow.
     * @param options
     */
    subscribeToUserFollowsFrom(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a user being followed by other users.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about the users they will be followed by.
     * @param options
     */
    subscribeToUserFollowsTo(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a user following other users.
     *
     * @expandParams
     *
     * @param user The user for which to not get any more notifications about the users they will follow.
     * @param options
     */
    unsubscribeFromUserFollowsFrom(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a user being followed by other users.
     *
     * @expandParams
     *
     * @param user The user for which to not get any more notifications about the users they will be followed by.
     * @param options
     */
    unsubscribeFromUserFollowsTo(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a stream changing, e.g. going live, offline or changing its title.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about their streams changing.
     * @param options
     */
    subscribeToStreamChanges(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a stream changing, e.g. going live, offline or changing its title.
     *
     * @expandParams
     *
     * @param user The user for which not to get any more notifications about their streams changing.
     * @param options
     */
    unsubscribeFromStreamChanges(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a user changing a public setting or their email address.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about changing a setting.
     * @param options
     * @param withEmail Whether to subscribe to email address changes. This adds the necessary scope to read the email address to the request.
     */
    subscribeToUserChanges(user: UserIdResolvable, options: HelixWebHookHubRequestOptions, withEmail?: boolean): Promise<void>;
    /**
     * Unsubscribes from events representing a user changing a public setting or their email address.
     *
     * @expandParams
     *
     * @param user The user for which not to get any more notifications about changing a setting.
     * @param options
     */
    unsubscribeFromUserChanges(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a channel subscription or unsubscription.
     *
     * @expandParams
     *
     * @param user The user for which to get notifications about subscriptions and unsubscriptions to their channel.
     * @param options
     */
    subscribeToSubscriptionEvents(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a channel subscription or unsubscription.
     *
     * @expandParams
     *
     * @param user The user for which not to get any more notifications about subscriptions and unsubscriptions to their channel.
     * @param options
     */
    unsubscribeFromSubscriptionEvents(user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to extension transactions.
     *
     * @expandParams
     *
     * @param extensionId The extension ID for which to get notifications about transactions.
     * @param options
     */
    subscribeToExtensionTransactions(extensionId: string, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from extension transactions.
     *
     * @expandParams
     *
     * @param extensionId The extension ID for which not to get any more notifications about transactions.
     * @param options
     */
    unsubscribeFromExtensionTransactions(extensionId: string, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about bans or unbans in their channel.
     * @param options
     */
    subscribeToBanEvents(broadcaster: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about bans or unbans in their channel.
     * @param options
     */
    unsubscribeFromBanEvents(broadcaster: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about bans or unbans in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    subscribeToBanEventsForUser(broadcaster: UserIdResolvable, user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a ban or unban.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about bans or unbans in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    unsubscribeFromBanEventsForUser(broadcaster: UserIdResolvable, user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about moderator changes in their channel.
     * @param options
     */
    subscribeToModeratorEvents(broadcaster: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about moderator changes in their channel.
     * @param options
     */
    unsubscribeFromModeratorEvents(broadcaster: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Subscribes to events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which to get notifications about moderator changes in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    subscribeToModeratorEventsForUser(broadcaster: UserIdResolvable, user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    /**
     * Unsubscribes from events representing a user gaining or losing moderator privileges in a channel.
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster for which not to get any more notifications about moderator changes in their channel.
     * @param user The user that is being banned or unbanned.
     * @param options
     */
    unsubscribeFromModeratorEventsForUser(broadcaster: UserIdResolvable, user: UserIdResolvable, options: HelixWebHookHubRequestOptions): Promise<void>;
    private _sendUserFollowsHubRequest;
    private _sendStreamChangeHubRequest;
    private _sendUserChangeHubRequest;
    private _sendSubscriptionEventsHubRequest;
    private _sendExtensionTransactionsHubRequest;
    private _sendBanEventsHubRequest;
    private _sendModeratorEventsHubRequest;
}