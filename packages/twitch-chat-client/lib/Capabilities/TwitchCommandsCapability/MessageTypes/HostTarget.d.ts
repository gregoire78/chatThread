import { Message, MessageParam } from 'ircv3';
/** @private */
export default class HostTarget extends Message<HostTarget> {
    channel: MessageParam;
    targetAndViewers: MessageParam;
}
