import Channel, { ChannelData } from '../Kraken/Channel/Channel';
import TwitchClient from '../../TwitchClient';
/** @private */
export interface ChannelEventData {
    _id: string;
    start_time: string;
    end_time: string;
    time_zone_id: string;
    title: string;
    description: string;
    cover_image_url: string;
    language: string;
    channel: ChannelData;
}
/** @private */
export interface ChannelEventAPIResult {
    _total: number;
    events: ChannelEventData[];
}
/**
 * An event held on a Twitch channel.
 */
export default class ChannelEvent {
    private readonly _data;
    private readonly _client;
    /** @private */
    constructor(_data: ChannelEventData, client: TwitchClient);
    /**
     * The ID of the event.
     */
    get id(): string;
    /**
     * The time when the event starts.
     */
    get startDate(): Date;
    /**
     * The time when the event ends.
     */
    get endDate(): Date;
    /**
     * The ID of the timezone that the start and end times of the event are local to.
     */
    get timeZoneId(): string;
    /**
     * The title of the event.
     */
    get title(): string;
    /**
     * The description of the event.
     */
    get description(): string;
    /**
     * The language of the event.
     */
    get language(): string;
    /**
     * The channel where the event is held.
     */
    get channel(): Channel;
    /**
     * Generates a URL to the cover image of the event with the given dimensions.
     *
     * @param width The width of the image.
     * @param height The height of the image.
     */
    buildCoverImageUrl(width: number, height: number): string;
}