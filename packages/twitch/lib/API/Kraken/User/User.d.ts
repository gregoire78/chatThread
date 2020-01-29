import ChannelPlaceholder from '../Channel/ChannelPlaceholder';
import { UserIdResolvable } from '../../../Toolkit/UserTools';
import TwitchClient from '../../../TwitchClient';
/** @private */
export interface UserData {
    _id: string;
    bio: string;
    created_at: string;
    name: string;
    display_name: string;
    logo: string;
    type: string;
    updated_at: string;
}
/**
 * A Twitch user.
 */
export default class User {
    protected _data: UserData;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(/** @private */ _data: UserData, client: TwitchClient);
    /** @private */
    get cacheKey(): string;
    /**
     * The ID of the user.
     */
    get id(): string;
    /**
     * The bio of the user.
     */
    get bio(): string;
    /**
     * The date when the user was created, i.e. when they registered on Twitch.
     */
    get creationDate(): Date;
    /**
     * The last date when the user changed anything in their profile, e.g. their description or their profile picture.
     */
    get updateDate(): Date;
    /**
     * The user name of the user.
     */
    get name(): string;
    /**
     * The display name of the user.
     */
    get displayName(): string;
    /**
     * The URL to the profile picture of the user.
     */
    get logoUrl(): string;
    /**
     * The type of the user.
     */
    get type(): string;
    /**
     * Retrieves the channel data of the user.
     */
    getChannel(): Promise<import("../Channel/Channel").default>;
    /**
     * Gets a channel placeholder object for the user, which can do anything you can do to a channel with just the ID.
     */
    getChannelPlaceholder(): ChannelPlaceholder;
    /**
     * Retrieves the currently running stream of the user.
     */
    getStream(): Promise<import("../Stream/Stream").default | null>;
    /**
     * Retrieves the subscription data for the user to the given channel.
     *
     * Throws if the channel doesn't have a subscription program or the user is not subscribed to it.
     *
     * This method requires access to the user. If you only have access to the channel,
     * use {@ChannelPlaceholder#getSubscriptionBy} instead.
     *
     * @param channel The channel you want to get the subscription data for.
     */
    getSubscriptionTo(channel: UserIdResolvable): Promise<import("./UserSubscription").default | null>;
    /**
     * Checks whether the user is subscribed to the given channel.
     *
     * @param channel The channel you want to check the subscription for.
     */
    isSubscribedTo(channel: UserIdResolvable): Promise<boolean>;
    /**
     * Retrieves a list of channels followed by the user.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     * @param orderBy The field to order by.
     * @param orderDirection The direction to order in - ascending or descending.
     */
    getFollows(page?: number, limit?: number, orderBy?: 'created_at' | 'last_broadcast' | 'login', orderDirection?: 'asc' | 'desc'): Promise<import("./UserFollow").default[]>;
    /**
     * Retrieves the follow data of the user to a given channel.
     *
     * @param channel The channel to retrieve the follow data for.
     */
    getFollowTo(channel: UserIdResolvable): Promise<import("./UserFollow").default | null>;
    /**
     * Checks whether the user is following the given channel.
     *
     * @param channel The channel to check for the user's follow.
     */
    follows(channel: UserIdResolvable): Promise<boolean>;
    /**
     * Follows the channel with the authenticated user.
     */
    follow(): Promise<import("./UserFollow").default>;
    /**
     * Unfollows the channel with the authenticated user.
     */
    unfollow(): Promise<void>;
    /**
     * Retrieves the emotes the user can use.
     */
    getEmotes(): Promise<import("../Channel/EmoteSetList").default>;
}
