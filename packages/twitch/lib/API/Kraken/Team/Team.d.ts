import TwitchClient from '../../../TwitchClient';
/** @private */
export interface TeamData {
    _id: string;
    background: string;
    banner: string;
    created_at: string;
    display_name: string;
    info: string;
    logo: string;
    name: string;
    updated_at: string;
}
/**
 * A Twitch team.
 */
export default class Team {
    protected _data: TeamData;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(/** @private */ _data: TeamData, client: TwitchClient);
    /**
     * The ID of the team.
     */
    get id(): string;
    /**
     * The background url of the team.
     */
    get background(): string;
    /**
     * The banner url of the team.
     */
    get banner(): string;
    /**
     * The date when the team was created.
     */
    get creationDate(): Date;
    /**
     * The last date when the team changed anything.
     */
    get updateDate(): Date;
    /**
     * The name of the team.
     */
    get name(): string;
    /**
     * The info of the team.
     */
    get info(): string;
    /**
     * The display name of the team.
     */
    get displayName(): string;
    /**
     * The URL to the profile picture of the team.
     */
    get logoUrl(): string;
    getUsers(): Promise<import("../User/User").default[]>;
}