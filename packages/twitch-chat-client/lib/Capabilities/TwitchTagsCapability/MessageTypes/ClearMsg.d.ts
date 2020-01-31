import { Message, MessageParam } from 'ircv3';
/**
 * @private
 */
export default class ClearMsg extends Message {
    static readonly COMMAND = "CLEARMSG";
    channel: MessageParam;
    message: MessageParam;
    get userName(): string;
    get targetMessageId(): string | undefined;
}
