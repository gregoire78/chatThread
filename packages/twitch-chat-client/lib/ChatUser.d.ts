/**
 * A user in chat.
 */
export default class ChatUser {
    private readonly _userData;
    private readonly _userName;
    /** @private */
    constructor(userName: string, userData: Map<string, string> | undefined);
    /**
     * The name of the user.
     */
    get userName(): string;
    /**
     * The display name of the user.
     */
    get displayName(): string;
    /**
     * The color the user chose to display in chat.
     *
     * Returns null if the user didn't choose a color. In this case, you should generate your own color.
     */
    get color(): string | undefined;
    /**
     * The badges of the user. Returned as a map that maps the badge category to the detail.
     */
    get badges(): Map<string, string>;
    /**
     * The ID of the user.
     */
    get userId(): string | undefined;
    /**
     * The type of the user.
     * Possible values are undefined, 'mod', 'global_mod', 'admin' and 'staff'.
     */
    get userType(): string | undefined;
    /**
     * Whether the user is subscribed to the channel.
     */
    get isSubscriber(): boolean;
    /**
     * Whether the user is a Founder of the channel.
     */
    get isFounder(): boolean;
    /**
     * Whether the user is a moderator of the channel.
     */
    get isMod(): boolean;
    /**
     * Whether the user is a VIP in the channel.
     */
    get isVip(): boolean;
}
