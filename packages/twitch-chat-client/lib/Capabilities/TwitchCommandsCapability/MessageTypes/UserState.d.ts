import { Message, MessageParam } from 'ircv3';
/** @private */
export default class UserState extends Message<UserState> {
    type: MessageParam;
}
