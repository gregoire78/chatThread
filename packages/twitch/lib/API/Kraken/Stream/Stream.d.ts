import Channel, { ChannelData } from '../Channel/Channel';
import TwitchClient from '../../../TwitchClient';
/**
 * The possible sizes for a stream preview.
 */
export declare type StreamPreviewSize = 'small' | 'medium' | 'large' | 'template';
/** @private */
export declare type StreamPreviewUrlList = {
    [size in StreamPreviewSize]: string;
};
/** @private */
export interface StreamDataWrapper {
    stream: StreamData;
}
/** @private */
export interface StreamDataWrapper {
    stream: StreamData;
}
/** @private */
export interface StreamData {
    _id: string | number;
    game: string;
    viewers: number;
    video_height: number;
    average_fps: number;
    delay: number;
    created_at: string;
    is_playlist: boolean;
    stream_type: StreamType;
    preview: StreamPreviewUrlList;
    channel: ChannelData;
}
/**
 * The type of a stream.
 */
export declare enum StreamType {
    /**
     * A live stream.
     */
    Live = "live",
    /**
     * An upload to the channel (VoD) that is streamed live for the first time.
     */
    Premiere = "premiere",
    /**
     * A rerun of a past live stream.
     */
    ReRun = "rerun",
    /**
     * All types of streams. Used for filtering.
     */
    All = "all"
}
/**
 * A Twitch stream.
 */
export default class Stream {
    private readonly _data;
    private readonly _client;
    /** @private */
    constructor(_data: StreamData, client: TwitchClient);
    /**
     * The ID of the stream.
     */
    get id(): string;
    /**
     * The game played on the stream.
     */
    get game(): string;
    /**
     * The current number of concurrent viewers.
     */
    get viewers(): number;
    /**
     * The height of the stream video.
     */
    get videoHeight(): number;
    /**
     * The average FPS (frames per second) that are shown on the stream.
     */
    get averageFPS(): number;
    /**
     * The delay of the stream, in seconds.
     */
    get delay(): number;
    /**
     * The time when the stream started.
     */
    get startDate(): Date;
    /**
     * Whether the stream is running a playlist.
     */
    get isPlaylist(): boolean;
    /**
     * The type of the stream.
     */
    get type(): StreamType;
    /**
     * Gets the URL of a preview image for the stream
     *
     * @param size The size of the image.
     */
    getPreviewUrl(size: StreamPreviewSize): string;
    /**
     * The channel where the stream is shown.
     */
    get channel(): Channel;
}