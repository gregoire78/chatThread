/** @private */
export interface ChattersListData {
    chatter_count: number;
    chatters: Record<string, string[]>;
}
/**
 * A list of chatters in a Twitch chat.
 */
export default class ChattersList {
    private readonly _data;
    /** @private */
    constructor(_data: ChattersListData);
    /**
     * A list of user names of all chatters in the chat.
     */
    get allChatters(): string[];
    /**
     * A map of user names of all chatters in the chat, mapped to their status in the channel.
     */
    get allChattersWithStatus(): Map<string, string>;
}
