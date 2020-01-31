import { Message, MessageParam } from 'ircv3';
import ChatUser from '../../../ChatUser';
/** @private */
export default class UserNotice extends Message<UserNotice, 'userInfo' | 'emoteOffsets'> {
    channel: MessageParam;
    message: MessageParam;
    get userInfo(): ChatUser;
    get emoteOffsets(): Map<any, any>;
}
