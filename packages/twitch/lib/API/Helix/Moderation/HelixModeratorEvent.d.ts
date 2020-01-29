import TwitchClient from '../../../TwitchClient';
import { HelixEventData } from '../HelixEvent';
import HelixModerator, { HelixModeratorData } from './HelixModerator';
/**
 * The different types a moderator event can have.
 */
export declare enum HelixModeratorEventType {
    /**
     * Sent when a user gains moderation privileges.
     */
    Add = "moderation.moderator.add",
    /**
     * Sent when a user loses moderation privileges.
     */
    Remove = "moderation.moderator.remove"
}
/** @private */
export interface HelixModeratorEventDetail extends HelixModeratorData {
    broadcaster_id: string;
    broadcaster_name: string;
}
/** @private */
export declare type HelixModeratorEventData = HelixEventData<HelixModeratorEventDetail, HelixModeratorEventType>;
/**
 * An event that indicates the change of a moderator status, i.e. gaining or losing moderation privileges.
 */
export default class HelixModeratorEvent extends HelixModerator {
    private readonly _eventData;
    /** @private */
    constructor(_eventData: HelixModeratorEventData, client: TwitchClient);
    /**
     * The unique ID of the moderator event.
     */
    get eventId(): string;
    /**
     * The type of the moderator event.
     */
    get eventType(): HelixModeratorEventType;
    /**
     * The date of the moderator event.
     */
    get eventDate(): Date;
    /**
     * The version of the moderator event.
     */
    get eventVersion(): string;
    /**
     * The id of the broadcaster where the user gained/lost moderation privileges.
     */
    get broadcasterId(): string;
    /**
     * Retrieves more data about the broadcaster.
     */
    getBroadcaster(): Promise<import("../User/HelixUser").default | null>;
    /**
     * The name of the broadcaster where the user gained/lost moderation privileges.
     */
    get broadcasterName(): string;
}
