import User, { UserData } from './User';
import { UserIdResolvable } from '../../../Toolkit/UserTools';
import UserFollow from './UserFollow';
/** @private */
export interface UserNotificationFlags {
    email: boolean;
    push: boolean;
}
/** @private */
export interface PrivilegedUserData extends UserData {
    email: string;
    email_verified: boolean;
    notifications: UserNotificationFlags;
    partnered: boolean;
    twitter_connected: boolean;
}
/**
 * A user you have extended privileges for, i.e. the currently authenticated user.
 *
 * @inheritDoc
 */
export default class PrivilegedUser extends User {
    /** @private */
    protected _data: PrivilegedUserData;
    /**
     * The user's email address.
     */
    get email(): string;
    /**
     * Whether the user's email address is verified.
     */
    get isEmailVerified(): boolean;
    /**
     * Whether the user has email notifications enabled.
     */
    get hasEmailNotifications(): boolean;
    /**
     * Whether the user has push notifications enabled.
     */
    get hasPushNotifications(): boolean;
    /**
     * Whether the user is partnered.
     */
    get isPartnered(): boolean;
    /**
     * Whether the user has a Twitter account connected.
     */
    get hasTwitter(): boolean;
    /**
     * Follows a channel.
     *
     * @param channel The channel to follow.
     * @param notifications Whether the user will receive notifications.
     */
    followChannel(channel: UserIdResolvable, notifications?: boolean): Promise<UserFollow>;
    /**
     * Unfollows a channel.
     *
     * @param channel The channel to unfollow.
     */
    unfollowChannel(channel: UserIdResolvable): Promise<void>;
    /**
     * Blocks a user.
     *
     * @param userToBlock The user to block.
     */
    blockUser(userToBlock: UserIdResolvable): Promise<import("./UserBlock").default>;
    /**
     * Unblocks a user.
     *
     * @param userToUnblock The user to unblock.
     */
    unblockUser(userToUnblock: UserIdResolvable): Promise<void>;
}