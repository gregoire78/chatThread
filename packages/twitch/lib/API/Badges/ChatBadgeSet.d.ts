import ChatBadgeVersion, { ChatBadgeVersionData } from './ChatBadgeVersion';
import TwitchClient from '../../TwitchClient';
/** @private */
export interface ChatBadgeSetData {
    versions: Record<string, ChatBadgeVersionData>;
}
/**
 * A set of badges.
 */
export default class ChatBadgeSet {
    private readonly _data;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(_data: ChatBadgeSetData, client: TwitchClient);
    /**
     * Names of all versions of the badge set.
     */
    get versionNames(): string[];
    /**
     * Gets a specific version of a badge by name.
     *
     * @param name The name of the version.
     */
    getVersion(name: string): ChatBadgeVersion;
}