/** @private */
export interface Emote {
    code: string;
    id: number;
}
/** @private */
export declare type EmoteSetListData = Record<string, Emote[]>;
/**
 * A list of emotes, grouped into emote sets, that a user can use.
 */
export default class EmoteSetList {
    private readonly _data;
    /** @private */
    constructor(_data: EmoteSetListData);
    /**
     * Finds the emote ID for the given emote code.
     *
     * @param emoteCode The emote code to check for.
     */
    findEmoteId(emoteCode: string): number | undefined;
}
