import TwitchClient from '../../../TwitchClient';
/**
 * The type of a stream.
 */
export declare enum HelixStreamType {
    /**
     * Returned by Twitch in case of an error.
     */
    None = "",
    /**
     * A live stream.
     */
    Live = "live",
    /**
     * A vodcast.
     *
     * Currently not supported by Twitch - but one can only hope and leave it in here.
     */
    Vodcast = "vodcast"
}
/** @private */
export interface HelixStreamData {
    id: string;
    user_id: string;
    user_name: string;
    game_id: string;
    community_ids: string[];
    type: HelixStreamType;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
}
/**
 * A Twitch stream.
 */
export default class HelixStream {
    private readonly _data;
    private readonly _client;
    /** @private */
    constructor(_data: HelixStreamData, client: TwitchClient);
    /**
     * The stream ID.
     */
    get id(): string;
    /**
     * The user ID.
     */
    get userId(): string;
    /**
     * The user's display name.
     */
    get userDisplayName(): string;
    /**
     * Retrieves information about the user broadcasting the stream.
     */
    getUser(): Promise<import("../User/HelixUser").default | null>;
    /**
     * The game ID.
     */
    get gameId(): string;
    /**
     * Retrieves information about the game that is being played on this stream.
     */
    getGame(): Promise<import("../Game/HelixGame").default | null>;
    /**
     * The type of the stream.
     */
    get type(): HelixStreamType;
    /**
     * The title of the stream.
     */
    get title(): string;
    /**
     * The number of viewers the stream currently has.
     */
    get viewers(): number;
    /**
     * The time when the stream started.
     */
    get startDate(): Date;
    /**
     * The language of the stream.
     */
    get language(): string;
    /**
     * The URL of the thumbnail of the stream.
     */
    get thumbnailUrl(): string;
}