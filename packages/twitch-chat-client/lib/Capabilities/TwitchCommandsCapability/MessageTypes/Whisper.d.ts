import { Message, MessageParam } from 'ircv3';
import ChatUser from '../../../ChatUser';
/** @private */
export default class Whisper extends Message<Whisper, 'userInfo' | 'emoteOffsets'> {
    target: MessageParam;
    message: MessageParam;
    get userInfo(): ChatUser;
    get emoteOffsets(): Map<string, string[]>;
}
