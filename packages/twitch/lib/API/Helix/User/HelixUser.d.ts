import { UserIdResolvable } from '../../../Toolkit/UserTools';
import TwitchClient from '../../../TwitchClient';
/**
 * The type of a broadcaster.
 */
export declare enum HelixBroadcasterType {
    /**
     * A Twitch Partner.
     */
    Partner = "partner",
    /**
     * A Twitch Affiliate.
     */
    Affiliate = "affiliate",
    /**
     * A user that's neither a partner nor an affiliate.
     */
    None = ""
}
/**
 * The type of a user.
 */
export declare enum HelixUserType {
    /**
     * A Twitch staff member.
     */
    Staff = "staff",
    /**
     * A Twitch administrator.
     */
    Admin = "admin",
    /**
     * A global moderator.
     */
    GlobalMod = "global_mod",
    /**
     * A user with no special permissions across Twitch.
     */
    None = ""
}
/** @private */
export interface HelixUserData {
    id: string;
    login: string;
    display_name: string;
    description: string;
    type: HelixUserType;
    broadcaster_type: HelixBroadcasterType;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
}
/**
 * A Twitch user.
 */
export default class HelixUser {
    protected _data: HelixUserData;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(/** @private */ _data: HelixUserData, client: TwitchClient);
    /** @private */
    get cacheKey(): string;
    /**
     * The ID of the user.
     */
    get id(): string;
    /**
     * The user name of the user.
     */
    get name(): string;
    /**
     * The display name of the user.
     */
    get displayName(): string;
    /**
     * The description of the user.
     */
    get description(): string;
    /**
     * The type of the user.
     */
    get type(): HelixUserType;
    /**
     * The type of the user.
     */
    get broadcasterType(): HelixBroadcasterType;
    /**
     * The URL to the profile picture of the user.
     */
    get profilePictureUrl(): string;
    /**
     * The URL to the offline video placeholder of the user.
     */
    get offlinePlaceholderUrl(): string;
    /**
     * The total number of views of the user's channel.
     */
    get views(): number;
    /**
     * Retrieves the channel's stream data.
     */
    getStream(): Promise<import("../Stream/HelixStream").default | null>;
    /**
     * Retrieves a list of broadcasters the user follows.
     */
    getFollows(): Promise<import("../HelixPaginatedResult").HelixPaginatedResultWithTotal<import("./HelixFollow").default>>;
    /**
     * Retrieves the follow data of the user to the given broadcaster.
     *
     * @param broadcaster The broadcaster to check the follow to.
     */
    getFollowTo(broadcaster: UserIdResolvable): Promise<import("./HelixFollow").default | null>;
    /**
     * Checks whether the user is following the given broadcaster.
     *
     * @param broadcaster The broadcaster to check the user's follow to.
     */
    follows(broadcaster: UserIdResolvable): Promise<boolean>;
    /**
     * Follows the broadcaster.
     */
    follow(): Promise<import("../../..").UserFollow>;
    /**
     * Unfollows the broadcaster.
     */
    unfollow(): Promise<void>;
    /**
     * Retrieves the subscription data for the user to the given broadcaster, or `null` if the user is not subscribed.
     *
     * @param broadcaster The broadcaster you want to get the subscription data for.
     */
    getSubscriptionTo(broadcaster: UserIdResolvable): Promise<import("../Subscriptions/HelixSubscription").default | null>;
    /**
     * Checks whether the user is subscribed to the given broadcaster.
     *
     * @param broadcaster The broadcaster you want to check the subscription for.
     */
    isSubscribedTo(broadcaster: UserIdResolvable): Promise<boolean>;
}