import Channel, { ChannelData } from '../Channel/Channel';
import TwitchClient from '../../../TwitchClient';
/** @private */
export interface UserFollowData {
    created_at: string;
    notifications: boolean;
    channel: ChannelData;
}
/**
 * A relation of a previously given user following a channel.
 */
export default class UserFollow {
    private readonly _data;
    private readonly _client;
    /** @private */
    constructor(_data: UserFollowData, client: TwitchClient);
    /**
     * The date when the user followed the channel.
     */
    get followDate(): Date;
    /**
     * Whether the user has notifications enabled for the channel.
     */
    get hasNotifications(): boolean;
    /**
     * The followed channel.
     */
    get channel(): Channel;
}
