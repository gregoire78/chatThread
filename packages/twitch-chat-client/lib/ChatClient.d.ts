import { LogLevel } from '@d-fischer/logger';
import { Listener } from '@d-fischer/typed-event-emitter';
import IRCClient from 'ircv3';
import { PrivateMessage } from 'ircv3/lib/Message/MessageTypes/Commands/';
import TwitchClient, { CommercialLength } from 'twitch';
import ClearChat from './Capabilities/TwitchCommandsCapability/MessageTypes/ClearChat';
import UserNotice from './Capabilities/TwitchCommandsCapability/MessageTypes/UserNotice';
import Whisper from './Capabilities/TwitchCommandsCapability/MessageTypes/Whisper';
import ClearMsg from './Capabilities/TwitchTagsCapability/MessageTypes/ClearMsg';
import TwitchPrivateMessage from './StandardCommands/TwitchPrivateMessage';
import ChatBitsBadgeUpgradeInfo from './UserNotices/ChatBitsBadgeUpgradeInfo';
import ChatCommunityPayForwardInfo from './UserNotices/ChatCommunityPayForwardInfo';
import ChatCommunitySubInfo from './UserNotices/ChatCommunitySubInfo';
import ChatPrimeCommunityGiftInfo from './UserNotices/ChatPrimeCommunityGiftInfo';
import ChatRaidInfo from './UserNotices/ChatRaidInfo';
import ChatRitualInfo from './UserNotices/ChatRitualInfo';
import ChatStandardPayForwardInfo from './UserNotices/ChatStandardPayForwardInfo';
import ChatSubInfo, { ChatSubExtendInfo, ChatSubGiftInfo, ChatSubGiftUpgradeInfo, ChatSubUpgradeInfo } from './UserNotices/ChatSubInfo';
/**
 * Options for a chat client.
 */
export interface ChatClientOptions {
    /**
     * Whether to request a token with only read permission.
     *
     * Ignored if `legacyScopes` is `true`.
     */
    readOnly?: boolean;
    /**
     * Whether to request a token with the old chat permission scope.
     *
     * If you're not sure whether this is necessary, just try leaving this off, and if it doesn't work, turn it on and try again.
     */
    legacyScopes?: boolean;
    /**
     * The minimum log level of messages that will be sent from the underlying IRC client.
     */
    logLevel?: LogLevel;
    /**
     * Whether to connect securely using SSL.
     *
     * You should not disable this except for debugging purposes.
     */
    ssl?: boolean;
    /**
     * Whether to use a WebSocket to connect to chat.
     */
    webSocket?: boolean;
    /**
     * Whether to receive JOIN and PART messages from Twitch chat.
     */
    requestMembershipEvents?: boolean;
}
/**
 * An interface to Twitch chat.
 *
 * @inheritDoc
 * @hideProtected
 */
export default class ChatClient extends IRCClient {
    private static readonly HOST_MESSAGE_REGEX;
    /** @private */
    readonly _twitchClient?: TwitchClient;
    private readonly _useLegacyScopes;
    private readonly _readOnly;
    private _authVerified;
    private _authFailureMessage?;
    private _chatLogger;
    /**
     * Fires when a user is timed out from a channel.
     *
     * @eventListener
     * @param channel The channel the user is timed out from.
     * @param user The timed out user.
     * @param reason The reason for the timeout.
     * @param duration The duration of the timeout, in seconds.
     */
    onTimeout: (handler: (channel: string, user: string, reason: string, duration: number, msg: ClearChat) => void) => Listener;
    /**
     * Fires when a user is permanently banned from a channel.
     *
     * @eventListener
     * @param channel The channel the user is banned from.
     * @param user The banned user.
     * @param reason The reason for the ban.
     */
    onBan: (handler: (channel: string, user: string, reason: string, msg: ClearChat) => void) => Listener;
    /**
     * Fires when a user upgrades their bits badge in a channel.
     *
     * @eventListener
     * @param channel The channel where the bits badge was upgraded.
     * @param user The user that has upgraded their bits badge.
     * @param ritualInfo Additional information about the upgrade.
     * @param msg The raw message that was received.
     */
    onBitsBadgeUpgrade: (handler: (channel: string, user: string, upgradeInfo: ChatBitsBadgeUpgradeInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when the chat of a channel is cleared.
     *
     * @eventListener
     * @param channel The channel whose chat is cleared.
     */
    onChatClear: (handler: (channel: string) => void) => Listener;
    /**
     * Fires when emote-only mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where emote-only mode is being toggled.
     * @param enabled Whether emote-only mode is being enabled. If false, it's being disabled.
     */
    onEmoteOnly: (handler: (channel: string, enabled: boolean) => void) => Listener;
    /**
     * Fires when followers-only mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where followers-only mode is being toggled.
     * @param enabled Whether followers-only mode is being enabled. If false, it's being disabled.
     * @param delay The time a user needs to follow the channel to be able to talk. Only available when `enabled === true`.
     */
    onFollowersOnly: (handler: (channel: string, enabled: boolean, delay?: number) => void) => Listener;
    /**
     * Fires when a channel hosts another channel.
     *
     * @eventListener
     * @param channel The hosting channel.
     * @param target The channel that is being hosted.
     * @param viewers The number of viewers in the hosting channel.
     *
     *   If you're not logged in as the owner of the channel, this is undefined.
     */
    onHost: (handler: (channel: string, target: string, viewers?: number) => void) => Listener;
    /**
     * Fires when a channel you're logged in as its owner is being hosted by another channel.
     *
     * @eventListener
     * @param channel The channel that is being hosted.
     * @param byChannel The hosting channel.
     * @param auto Whether the host was triggered automatically (by Twitch's auto-host functionality).
     * @param viewers The number of viewers in the hosting channel.
     */
    onHosted: (handler: (channel: string, byChannel: string, auto: boolean, viewers?: number) => void) => Listener;
    /**
     * Fires when Twitch tells you the number of hosts you have remaining in the next half hour for the channel
     * for which you're logged in as owner after hosting a channel.
     *
     * @eventListener
     * @param channel The hosting channel.
     * @param numberOfHosts The number of hosts remaining in the next half hour.
     */
    onHostsRemaining: (handler: (channel: string, numberOfHosts: number) => void) => Listener;
    /**
     * Fires when a user joins a channel.
     *
     * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
     *
     * @eventListener
     * @param channel The channel that is being joined.
     * @param user The user that joined.
     */
    onJoin: (handler: (channel: string, user: string) => void) => Listener;
    /**
     * Fires when a user leaves ("parts") a channel.
     *
     * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
     *
     * @eventListener
     * @param channel The channel that is being left.
     * @param user The user that left.
     */
    onPart: (handler: (channel: string, user: string) => void) => Listener;
    /**
     * Fires when a single message is removed from a channel.
     *
     * @eventListener
     * @param channel The channel where the message was removed.
     * @param messageId The ID of the message that was removed.
     * @param msg The raw message that was received.
     *
     * This is *not* the message that was removed. The text of the message is available using `msg.params.message` though.
     */
    onMessageRemove: (handler: (channel: string, messageId: string, msg: ClearMsg) => void) => Listener;
    /**
     * Fires when R9K mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where R9K mode is being toggled.
     * @param enabled Whether R9K mode is being enabled. If false, it's being disabled.
     */
    onR9k: (handler: (channel: string, enabled: boolean) => void) => Listener;
    /**
     * Fires when host mode is disabled in a channel.
     *
     * @eventListener
     * @param channel The channel where host mode is being disabled.
     */
    onUnhost: (handler: (channel: string) => void) => Listener;
    /**
     * Fires when a user raids a channel.
     *
     * @eventListener
     * @param channel The channel that was raided.
     * @param user The user that has raided the channel.
     * @param raidInfo Additional information about the raid.
     * @param msg The raw message that was received.
     */
    onRaid: (handler: (channel: string, user: string, raidInfo: ChatRaidInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user cancels a raid.
     *
     * @eventListener
     * @param channel The channel where the raid was cancelled.
     * @param msg The raw message that was received.
     */
    onRaidCancel: (handler: (channel: string, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user performs a "ritual" in a channel.
     *
     * @eventListener
     * @param channel The channel where the ritual was performed.
     * @param user The user that has performed the ritual.
     * @param ritualInfo Additional information about the ritual.
     * @param msg The raw message that was received.
     */
    onRitual: (handler: (channel: string, user: string, ritualInfo: ChatRitualInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when slow mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where slow mode is being toggled.
     * @param enabled Whether slow mode is being enabled. If false, it's being disabled.
     * @param delay The time a user has to wait between sending messages. Only set when enabling slow mode.
     */
    onSlow: (handler: (channel: string, enabled: boolean, delay?: number) => void) => Listener;
    /**
     * Fires when sub only mode is toggled in a channel.
     *
     * @eventListener
     * @param channel The channel where sub only mode is being toggled.
     * @param enabled Whether sub only mode is being enabled. If false, it's being disabled.
     */
    onSubsOnly: (handler: (channel: string, enabled: boolean) => void) => Listener;
    /**
     * Fires when a user subscribes to a channel.
     *
     * @eventListener
     * @param channel The channel that was subscribed to.
     * @param user The subscribing user.
     * @param subInfo Additional information about the subscription.
     * @param msg The raw message that was received.
     */
    onSub: (handler: (channel: string, user: string, subInfo: ChatSubInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user resubscribes to a channel.
     *
     * @eventListener
     * @param channel The channel that was resubscribed to.
     * @param user The resubscribing user.
     * @param subInfo Additional information about the resubscription.
     * @param msg The raw message that was received.
     */
    onResub: (handler: (channel: string, user: string, subInfo: ChatSubInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user gifts a subscription to a channel to another user.
     *
     * @eventListener
     * @param channel The channel that was subscribed to.
     * @param user The user that the subscription was gifted to. The gifting user is defined in `subInfo.gifter`.
     * @param subInfo Additional information about the subscription.
     * @param msg The raw message that was received.
     */
    onSubGift: (handler: (channel: string, user: string, subInfo: ChatSubGiftInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user gifts random subscriptions to the community of a channel.
     *
     * @eventListener
     * @param channel The channel that was subscribed to.
     * @param user The gifting user.
     * @param subInfo Additional information about the community subscription.
     * @param msg The raw message that was received.
     */
    onCommunitySub: (handler: (channel: string, user: string, subInfo: ChatCommunitySubInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user extends their subscription using a Sub Token.
     *
     * @eventListener
     * @param channel The channel where the subscription was extended.
     * @param user The user that extended their subscription.
     * @param subInfo Additional information about the subscription extension.
     * @param msg The raw message that was received.
     */
    onSubExtend: (handler: (channel: string, user: string, subInfo: ChatSubExtendInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user upgrades their Prime subscription to a paid subscription in a channel.
     *
     * @eventListener
     * @param channel The channel where the subscription was upgraded.
     * @param user The user that upgraded their subscription.
     * @param subInfo Additional information about the subscription upgrade.
     * @param msg The raw message that was received.
     */
    onPrimePaidUpgrade: (handler: (channel: string, user: string, subInfo: ChatSubUpgradeInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user upgrades their gift subscription to a paid subscription in a channel.
     *
     * @eventListener
     * @param channel The channel where the subscription was upgraded.
     * @param user The user that upgraded their subscription.
     * @param subInfo Additional information about the subscription upgrade.
     * @param msg The raw message that was received.
     */
    onGiftPaidUpgrade: (handler: (channel: string, user: string, subInfo: ChatSubGiftUpgradeInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user gifts a Twitch Prime benefit to the channel.
     *
     * @eventListener
     * @param channel The channel where the benefit was gifted.
     * @param user The user that received the gift.
     *
     * **WARNING:** This is a *display name* and thus will not work as an identifier for the API (login) in some cases.
     * @param subInfo Additional information about the gift.
     * @param msg The raw message that was received.
     */
    onPrimeCommunityGift: (handler: (channel: string, user: string, subInfo: ChatPrimeCommunityGiftInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user pays forward a subscription that was gifted to them to a specific user.
     *
     * @eventListener
     * @param channel The channel where the gift was forwarded.
     * @param user The user that forwarded the gift.
     * @param forwardInfo Additional information about the gift.
     * @param msg The raw message that was received.
     */
    onStandardPayForward: (handler: (channel: string, user: string, forwardInfo: ChatStandardPayForwardInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when a user pays forward a subscription that was gifted to them to the community.
     *
     * @eventListener
     * @param channel The channel where the gift was forwarded.
     * @param user The user that forwarded the gift.
     * @param forwardInfo Additional information about the gift.
     * @param msg The raw message that was received.
     */
    onCommunityPayForward: (handler: (channel: string, user: string, forwardInfo: ChatCommunityPayForwardInfo, msg: UserNotice) => void) => Listener;
    /**
     * Fires when receiving a whisper from another user.
     *
     * @eventListener
     * @param user The user that sent the whisper.
     * @param message The message text.
     * @param msg The raw message that was received.
     */
    onWhisper: (handler: (user: string, message: string, msg: Whisper) => void) => Listener;
    /**
     * Fires when you tried to execute a command you don't have sufficient permission for.
     *
     * @eventListener
     * @param channel The channel that a command without sufficient permissions was executed on.
     * @param message The message text.
     */
    onNoPermission: (handler: (channel: string, message: string) => void) => Listener;
    /**
     * Fires when a message you tried to send gets rejected by the ratelimiter.
     *
     * @eventListener
     * @param channel The channel that was attempted to send to.
     * @param message The message text.
     */
    onMessageRatelimit: (handler: (channel: string, message: string) => void) => Listener;
    /**
     * Fires when authentication fails.
     *
     * @eventListener
     * @param channel The channel that a command without sufficient permissions was executed on.
     * @param message The message text.
     */
    onAuthenticationFailure: (handler: (message: string) => void) => Listener;
    /**
     * Fires when sending a message fails.
     *
     * @eventListener
     * @param channel The channel that rejected the message.
     * @param reason The reason for the failure, e.g. you're banned (msg_banned)
     */
    onMessageFailed: (handler: (channel: string, reason: string) => void) => Listener;
    /**
     * Fires when a user sends a message to a channel.
     *
     * @eventListener
     * @param channel The channel the message was sent to.
     * @param user The user that send the message.
     * @param message The message text.
     * @param msg The raw message that was received.
     */
    onPrivmsg: (handler: (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => void) => Listener;
    /**
     * Fires when a user sends an action (/me) to a channel.
     *
     * @eventListener
     * @param channel The channel the action was sent to.
     * @param user The user that send the action.
     * @param message The action text.
     * @param msg The raw message that was received.
     */
    onAction: (handler: (channel: string, user: string, message: string, msg: TwitchPrivateMessage) => void) => Listener;
    private readonly _onBanResult;
    private readonly _onTimeoutResult;
    private readonly _onUnbanResult;
    private readonly _onColorResult;
    private readonly _onCommercialResult;
    private readonly _onDeleteMessageResult;
    private readonly _onEmoteOnlyResult;
    private readonly _onEmoteOnlyOffResult;
    private readonly _onFollowersOnlyResult;
    private readonly _onFollowersOnlyOffResult;
    private readonly _onHostResult;
    private readonly _onUnhostResult;
    private readonly _onModResult;
    private readonly _onUnmodResult;
    private readonly _onModsResult;
    private readonly _onJoinResult;
    private readonly _onR9kResult;
    private readonly _onR9kOffResult;
    private readonly _onSlowResult;
    private readonly _onSlowOffResult;
    private readonly _onSubsOnlyResult;
    private readonly _onSubsOnlyOffResult;
    private readonly _onVipResult;
    private readonly _onUnvipResult;
    private readonly _onVipsResult;
    /**
     * Creates a new Twitch chat client with the user info from the TwitchClient instance.
     *
     * @expandParams
     *
     * @param twitchClient The TwitchClient instance to use for user info and API requests.
     * @param options
     */
    static forTwitchClient(twitchClient: TwitchClient, options?: ChatClientOptions): Promise<ChatClient>;
    /**
     * Creates a new anonymous Twitch chat client.
     *
     * @expandParams
     *
     * @param options
     */
    static anonymous(options?: ChatClientOptions): ChatClient;
    /**
     * Creates a new Twitch chat client.
     *
     * @expandParams
     *
     * @param twitchClient The {@TwitchClient} instance to use for API requests.
     * @param options
     */
    constructor(twitchClient: TwitchClient | undefined, options: ChatClientOptions);
    connect(): Promise<void>;
    /**
     * Hosts a channel on another channel.
     *
     * @param target The host target, i.e. the channel that is being hosted.
     * @param channel The host source, i.e. the channel that is hosting. Defaults to the channel of the connected user.
     */
    host(target: string, channel?: string): Promise<void>;
    /**
     * Ends any host on a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * If you don't need this feedback, consider using {@ChatClient#unhostOutside} instead.
     *
     * @param channel The channel to end the host on. Defaults to the channel of the connected user.
     */
    unhost(channel?: string): Promise<void>;
    /**
     * Ends any host on a channel.
     *
     * This works even when not in the channel that was hosted, but provides no feedback about success of the command.
     *
     * If you need feedback about success, use {@ChatClient#unhost} (but make sure you're in the channel you are hosting).
     *
     * @param channel The channel to end the host on. Defaults to the channel of the connected user.
     */
    unhostOutside(channel?: string): void;
    /**
     * Bans a user from a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * @param channel The channel to ban the user from. Defaults to the channel of the connected user.
     * @param user The user to ban from the channel.
     * @param reason The reason for the ban.
     */
    ban(channel: string | undefined, user: string, reason?: string): Promise<void>;
    /**
     * Clears all messages in a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * @param channel The channel to ban the user from. Defaults to the channel of the connected user.
     */
    clear(channel?: string): Promise<void>;
    /**
     * Changes your username color.
     *
     * @param color The hexadecimal code (prefixed with #) or color name to use for your username.
     *
     * Please note that only Twitch Turbo or Prime users can use hexadecimal codes for arbitrary colors.
     *
     * If you have neither of those, you can only choose from the following color names:
     *
     * Blue, BlueViolet, CadetBlue, Chocolate, Coral, DodgerBlue, Firebrick, GoldenRod, Green, HotPink, OrangeRed, Red, SeaGreen, SpringGreen, YellowGreen
     */
    changeColor(color: string): Promise<void>;
    /**
     * Runs a commercial break on a channel.
     *
     * @param channel The channel to run the commercial break on.
     * @param duration The duration of the commercial break.
     */
    runCommercial(channel: string, duration: CommercialLength): Promise<void>;
    /**
     * Deletes a message from a channel.
     *
     * @param channel The channel to delete the message from.
     * @param message The message (as message ID or message object) to delete.
     */
    deleteMessage(channel: string, message: string | PrivateMessage): Promise<void>;
    /**
     * Enables emote-only mode in a channel.
     *
     * @param channel The channel to enable emote-only mode in.
     */
    enableEmoteOnly(channel: string): Promise<void>;
    /**
     * Disables emote-only mode in a channel.
     *
     * @param channel The channel to disable emote-only mode in.
     */
    disableEmoteOnly(channel: string): Promise<void>;
    /**
     * Enables followers-only mode in a channel.
     *
     * @param channel The channel to enable followers-only mode in.
     * @param delay The time (in minutes) a user needs to be following before being able to send messages.
     */
    enableFollowersOnly(channel: string, delay?: number): Promise<void>;
    /**
     * Disables followers-only mode in a channel.
     *
     * @param channel The channel to disable followers-only mode in.
     */
    disableFollowersOnly(channel: string): Promise<void>;
    /**
     * Gives a user moderator rights in a channel.
     *
     * @param channel The channel to give the user moderator rights in.
     * @param user The user to give moderator rights.
     */
    mod(channel: string, user: string): Promise<void>;
    /**
     * Takes moderator rights from a user in a channel.
     *
     * @param channel The channel to remove the user's moderator rights in.
     * @param user The user to take moderator rights from.
     */
    unmod(channel: string, user: string): Promise<void>;
    /**
     * Retrieves a list of moderators in a channel.
     *
     * @param channel The channel to retrieve the moderators of.
     */
    getMods(channel: string): Promise<string[]>;
    /**
     * Enables r9k mode in a channel.
     *
     * @param channel The channel to enable r9k mode in.
     */
    enableR9k(channel: string): Promise<void>;
    /**
     * Disables r9k mode in a channel.
     *
     * @param channel The channel to disable r9k mode in.
     */
    disableR9k(channel: string): Promise<void>;
    /**
     * Enables slow mode in a channel.
     *
     * @param channel The channel to enable slow mode in.
     * @param delay The time (in seconds) a user needs to wait between messages.
     */
    enableSlow(channel: string, delay: number): Promise<void>;
    /**
     * Disables slow mode in a channel.
     *
     * @param channel The channel to disable slow mode in.
     */
    disableSlow(channel: string): Promise<void>;
    /**
     * Enables subscribers-only mode in a channel.
     *
     * @param channel The channel to enable subscribers-only mode in.
     */
    enableSubsOnly(channel: string): Promise<void>;
    /**
     * Disables subscribers-only mode in a channel.
     *
     * @param channel The channel to disable subscribers-only mode in.
     */
    disableSubsOnly(channel: string): Promise<void>;
    /**
     * Times out a user in a channel and removes all their messages.
     *
     * @param channel The channel to time out the user in.
     * @param user The user to time out.
     * @param duration The time (in seconds) until the user can send messages again. Defaults to 1 minute.
     * @param reason
     */
    timeout(channel: string, user: string, duration?: number, reason?: string): Promise<void>;
    /**
     * Removes all messages of a user from a channel.
     *
     * @param channel The channel to purge the user's messages from.
     * @param user The user to purge.
     * @param reason The reason for the purge.
     */
    purge(channel: string, user: string, reason?: string): Promise<void>;
    /**
     * Gives a user VIP status in a channel.
     *
     * @param channel The channel to give the user VIP status in.
     * @param user The user to give VIP status.
     */
    addVIP(channel: string, user: string): Promise<void>;
    /**
     * Takes VIP status from a user in a channel.
     *
     * @param channel The channel to remove the user's VIP status in.
     * @param user The user to take VIP status from.
     */
    removeVIP(channel: string, user: string): Promise<void>;
    /**
     * Retrieves a list of moderators in a channel.
     *
     * @param channel The channel to retrieve the moderators of.
     */
    getVIPs(channel: string): Promise<string[]>;
    /**
     * Sends a message to a channel.
     *
     * @param channel The channel to send the message to.
     * @param message The message to send.
     */
    say(channel: string, message: string): void;
    /**
     * Sends an action message (/me) to a channel.
     *
     * @param channel The channel to send the message to.
     * @param message The message to send.
     */
    action(channel: string, message: string): void;
    /**
     * Sends a whisper message to another user.
     *
     * @param user The user to send the message to.
     * @param message The message to send.
     */
    whisper(user: string, message: string): void;
    /**
     * Joins a channel.
     *
     * @param channel The channel to join.
     */
    join(channel: string): Promise<void>;
    /**
     * Disconnects from the chat server.
     */
    quit(): Promise<void>;
    /**
     * Waits for authentication (or "registration" in IRC terms) to finish.
     *
     * @deprecated Use the `onRegister` event instead.
     */
    waitForRegistration(): Promise<void>;
    protected registerCoreMessageTypes(): void;
    protected getPassword(currentPassword?: string): Promise<string | undefined>;
    private static _generateJustinfanNick;
}
