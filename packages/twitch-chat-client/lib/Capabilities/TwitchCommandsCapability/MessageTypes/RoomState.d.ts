import { Message, MessageParam } from 'ircv3';
/** @private */
export default class RoomState extends Message<RoomState> {
    channel: MessageParam;
}
