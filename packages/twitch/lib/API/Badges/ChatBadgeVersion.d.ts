import TwitchClient from '../../TwitchClient';
/** @private */
export interface ChatBadgeVersionData {
    click_action: string;
    click_url: string;
    description: string;
    image_url_1x: string;
    image_url_2x: string;
    image_url_4x: string;
    title: string;
}
/** @private */
export declare type ChatBadgeScale = 1 | 2 | 4;
/**
 * A version of a badge.
 */
export default class ChatBadgeVersion {
    private readonly _data;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(_data: ChatBadgeVersionData, client: TwitchClient);
    /**
     * The action to execute when the badge is clicked.
     */
    get clickAction(): string;
    /**
     * The URL to visit when the badge is clicked.
     *
     * Only applies if clickAction === 'visit_url'.
     */
    get clickUrl(): string;
    /**
     * The description of the badge.
     */
    get description(): string;
    /**
     * Gets an image URL for the given scale.
     *
     * @param scale The scale of the badge image.
     */
    getImageUrl(scale: ChatBadgeScale): string;
    /**
     * The title of the badge.
     */
    get title(): string;
}