import TwitchClient from '../../../TwitchClient';
export declare type HelixVideoViewableStatus = 'public' | 'private';
export declare type HelixVideoType = 'upload' | 'archive' | 'highlight';
/** @private */
export interface HelixVideoData {
    id: string;
    user_id: string;
    user_name: string;
    title: string;
    description: string;
    created_at: string;
    published_at: string;
    url: string;
    thumbnail_url: string;
    viewable: HelixVideoViewableStatus;
    view_count: number;
    language: string;
    type: HelixVideoType;
    duration: string;
}
/**
 * A video on Twitch.
 */
export default class HelixVideo {
    private readonly _data;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(_data: HelixVideoData, client: TwitchClient);
    /**
     * The ID of the video.
     */
    get id(): string;
    /**
     * The ID of the user who created the video.
     */
    get userId(): string;
    /**
     * The display name of the user who created the video.
     */
    get userDisplayName(): string;
    /**
     * Retrieves information about the user who created the video.
     */
    getUser(): Promise<import("../User/HelixUser").default | null>;
    /**
     * The title of the video.
     */
    get title(): string;
    /**
     * The description of the video.
     */
    get description(): string;
    /**
     * The date when the video was created.
     */
    get creationDate(): Date;
    /**
     * The date when the video was published.
     */
    get publishDate(): Date;
    /**
     * The URL of the video.
     */
    get url(): string;
    /**
     * The URL of the thumbnail of the video.
     */
    get thumbnailUrl(): string;
    /**
     * Whether the video is public or not.
     */
    get isPublic(): boolean;
    /**
     * The number of views of the video.
     */
    get views(): number;
    /**
     * The language of the video.
     */
    get language(): string;
    /**
     * The type of the video.
     */
    get type(): HelixVideoType;
    /**
     * The duration of the video, as formatted by Twitch.
     */
    get duration(): string;
    /**
     * The duration of the video, in seconds.
     */
    get durationInSeconds(): number;
}
