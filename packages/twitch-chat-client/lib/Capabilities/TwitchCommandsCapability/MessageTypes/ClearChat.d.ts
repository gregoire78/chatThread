import { Message, MessageParam } from 'ircv3';
/** @private */
export default class ClearChat extends Message<ClearChat> {
    channel: MessageParam;
    user: MessageParam;
}
