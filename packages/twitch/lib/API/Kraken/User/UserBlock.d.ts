import User, { UserData } from './User';
import TwitchClient from '../../../TwitchClient';
/** @private */
export interface UserBlockData {
    _id: string;
    updated_at: string;
    user: UserData;
}
/**
 * A relation of a previously givn user blocking another user.
 */
export default class UserBlock {
    private readonly _data;
    private readonly _client;
    /** @private */
    constructor(_data: UserBlockData, client: TwitchClient);
    /**
     * The blocked user.
     */
    get blockedUser(): User;
}