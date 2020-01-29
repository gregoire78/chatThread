import ChannelPlaceholder, { ChannelPlaceholderData } from './ChannelPlaceholder';
import TwitchClient from '../../../TwitchClient';
import { ChannelUpdateData } from './ChannelAPI';
/** @private */
export interface ChannelData extends ChannelPlaceholderData {
    broadcaster_language: string;
    broadcaster_type: string;
    created_at: string;
    description: string;
    display_name: string;
    followers: number;
    game: string;
    language: string;
    logo: string;
    mature: boolean;
    name: string;
    partner: boolean;
    profile_banner: string | null;
    profile_banner_background_color: string | null;
    status: string;
    updated_at: string;
    url: string;
    video_banner: string;
    views: number;
}
/**
 * A Twitch Channel.
 */
export default class Channel extends ChannelPlaceholder {
    /** @private */
    protected _data: ChannelData;
    /** @private */
    constructor(data: ChannelData, client: TwitchClient);
    /** @private */
    getChannel(): Promise<this>;
    /**
     * Updates the game, title or delay of a channel or toggles the channel feed.
     */
    update(data: ChannelUpdateData): Promise<void>;
    /**
     * The name of the channel.
     */
    get name(): string;
    /**
     * The display name of the channel, with proper capitalization or as Asian script.
     */
    get displayName(): string;
    /**
     * The broadcaster's language.
     */
    get broadcasterLanguage(): string;
    /**
     * The broadcaster's type, i.e. "partner", "affiliate" or "" (empty string, so neither of them).
     */
    get broadcasterType(): string;
    /**
     * The date when the channel was created.
     */
    get creationDate(): Date;
    /**
     * The description of the channel.
     */
    get description(): string;
    /**
     * The number of people following the channel.
     */
    get followers(): number;
    /**
     * The game that is currently being played on the channel (or was played when it was last online).
     */
    get game(): string;
    /**
     * The language of the channel.
     */
    get language(): string;
    /**
     * The URL to the logo of the channel.
     */
    get logo(): string;
    /**
     * Whether the channel is flagged as suitable for mature audiences only.
     */
    get isMature(): boolean;
    /**
     * Whether the channel is partnered.
     */
    get isPartner(): boolean;
    /**
     * The URL to the profile's banner image.
     */
    get profileBanner(): string | null;
    /**
     * The background color of the profile's banner.
     */
    get profileBannerBackgroundColor(): string | null;
    /**
     * The current status message (i.e. the title) of the channel.
     */
    get status(): string;
    /**
     * The date when the channel was last updated.
     */
    get updateDate(): Date;
    /**
     * The URL to the channel.
     */
    get url(): string;
    /**
     * The URL to the channel's video banner, i.e. the offline image.
     */
    get videoBanner(): string;
    /**
     * The total number of views of the channel.
     */
    get views(): number;
}
