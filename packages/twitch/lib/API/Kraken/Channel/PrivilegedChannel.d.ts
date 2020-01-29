import Channel, { ChannelData } from './Channel';
import { CommercialLength } from './ChannelAPI';
/** @private */
export interface PrivilegedChannelData extends ChannelData {
    stream_key: string;
    email: string;
}
/**
 * A channel you have extended privileges for, i.e. the channel of the currently authenticated user.
 */
export default class PrivilegedChannel extends Channel {
    /** @private */
    protected _data: PrivilegedChannelData;
    /**
     * The channel's stream key.
     */
    get streamKey(): string;
    /**
     * The channel's email address.
     */
    get email(): string;
    /**
     * Retrieves the list of editors of the channel.
     */
    getEditors(): Promise<import("../User/User").default[]>;
    /**
     * Starts a commercial in the channel.
     *
     * @param length The length of the commercial.
     */
    startCommercial(length: CommercialLength): Promise<void>;
    /**
     * Resets the given channel's stream key.
     */
    resetStreamKey(): Promise<string>;
}