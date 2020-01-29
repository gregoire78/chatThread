import TwitchClient from '../../../TwitchClient';
/**
 * The type of background a cheermote is supposed to appear on.
 *
 * We will supply a fitting graphic that does not show any artifacts
 * on the given type of background.
 */
export declare enum CheermoteBackground {
    /**
     * A dark background.
     *
     * Cheermotes might show artifacts on bright backgrounds.
     */
    dark = "dark",
    /**
     * A bright background.
     *
     * Cheermotes might show artifacts on dark backgrounds.
     */
    light = "light"
}
/**
 * The state of a cheermote, i.e. whether it's animated or not.
 */
export declare enum CheermoteState {
    /**
     * The cheermote should be animated.
     */
    animated = "animated",
    /**
     * The cheermote should not be animated.
     */
    static = "static"
}
/**
 * The scale of the cheermote, which usually relates to the pixel density of the device in use.
 */
export declare enum CheermoteScale {
    /**
     * The cheermote should not be scaled.
     */
    x1 = "1",
    /**
     * The cheermote should be scaled 1.5x.
     */
    x1_5 = "1.5",
    /**
     * The cheermote should be scaled 2x.
     */
    x2 = "2",
    /**
     * The cheermote should be scaled 3x.
     */
    x3 = "3",
    /**
     * The cheermote should be scaled 4x.
     */
    x4 = "4"
}
/** @private */
export declare type CheermoteActionImageUrlsByScale = {
    [scale in CheermoteScale]: string;
};
/** @private */
export declare type CheermoteActionImageUrlsByStateAndScale = {
    [state in CheermoteState]: CheermoteActionImageUrlsByScale;
};
/** @private */
export declare type CheermoteActionImageUrlsByBackgroundAndStateAndScale = {
    [background in CheermoteBackground]: CheermoteActionImageUrlsByStateAndScale;
};
/** @private */
export interface CheermoteActionTierData {
    min_bits: number;
    id: string;
    color: string;
    images: CheermoteActionImageUrlsByBackgroundAndStateAndScale[];
}
/** @private */
export interface CheermoteActionData {
    prefix: string;
    scales: string[];
    tiers: CheermoteActionTierData[];
    backgrounds: string[];
    states: string[];
    type: string;
    updated_at: string;
    priority: number;
}
/** @private */
export interface CheermoteListData {
    actions: CheermoteActionData[];
}
/**
 * The format of the cheermote you want to request.
 */
export interface CheermoteFormat {
    /**
     * The desired background for the cheermote.
     */
    background: CheermoteBackground;
    /**
     * The desired cheermote state.
     */
    state: CheermoteState;
    /**
     * The desired cheermote scale.
     */
    scale: CheermoteScale;
}
/**
 * The details on how a cheermote should be displayed.
 */
export interface CheermoteDisplayInfo {
    /**
     * The URL of the image that should be shown.
     */
    url: string;
    /**
     * The color that should be used to shown the cheer amount.
     *
     * This is a hexadecimal color value, e.g. `#9c3ee8`.
     */
    color: string;
}
/**
 * A description of a specific cheermote parsed from a message.
 */
export interface MessageCheermote {
    /**
     * The name of the cheermote.
     */
    name: string;
    /**
     * The amount of bits for the cheermote.
     */
    amount: number;
    /**
     * The position of the cheermote in the text, zero based.
     */
    position: number;
    /**
     * The length of the cheermote in the text.
     */
    length: number;
    /**
     * Information on how the cheermote is supposed to be displayed.
     */
    displayInfo: CheermoteDisplayInfo;
}
/**
 * A list of cheermotes you can use globally or in a specific channel, depending on how you fetched the list.
 */
export default class CheermoteList {
    private readonly _client;
    private readonly _data;
    /** @private */
    constructor(data: CheermoteActionData[], client: TwitchClient);
    /**
     * Gets the URL and color needed to properly represent a cheer of the given amount of bits with the given prefix.
     *
     * @param name The name/prefix of the cheermote.
     * @param bits The amount of bits cheered.
     * @param format The format of the cheermote you want to request.
     */
    getCheermoteDisplayInfo(name: string, bits: number, format?: Partial<CheermoteFormat>): CheermoteDisplayInfo;
    /**
     * Gets all possible cheermote names.
     */
    getPossibleNames(): string[];
    /**
     * Parses all the cheermotes out of a message.
     *
     * @param message The message.
     */
    parseMessage(message: string): MessageCheermote[];
    /**
     * Transforms all the cheermotes in a message and returns an array of all the message parts.
     *
     * @param message The message.
     * @param transformer A function that transforms a message part into an arbitrary structure.
     */
    transformCheerMessage<T>(message: string, transformer: (displayInfo: MessageCheermote) => string | T): (string | T)[];
}