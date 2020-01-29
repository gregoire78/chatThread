import User, { UserData } from '../User/User';
import TwitchClient from '../../../TwitchClient';
/** @private */
export interface ChannelFollowData {
    created_at: string;
    notifications: boolean;
    user: UserData;
}
/**
 * A relation of a user following a previously given channel.
 */
export default class ChannelFollow {
    private readonly _data;
    /** @private */
    private readonly _client;
    /** @private */
    constructor(_data: ChannelFollowData, client: TwitchClient);
    /**
     * The user following the given channel.
     */
    get user(): User;
    /**
     * Whether the user has notifications enabled for the channel.
     */
    get hasNotifications(): boolean;
    /**
     * The date when the user followed.
     */
    get followDate(): Date;
}
