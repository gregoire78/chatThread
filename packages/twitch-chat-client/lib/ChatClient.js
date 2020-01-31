"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var logger_1 = require("@d-fischer/logger");
var ircv3_1 = require("ircv3");
var Commands_1 = require("ircv3/lib/Message/MessageTypes/Commands/");
var TwitchCommandsCapability_1 = require("./Capabilities/TwitchCommandsCapability");
var ClearChat_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/ClearChat");
var HostTarget_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/HostTarget");
var RoomState_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/RoomState");
var UserNotice_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/UserNotice");
var Whisper_1 = require("./Capabilities/TwitchCommandsCapability/MessageTypes/Whisper");
var TwitchMembershipCapability_1 = require("./Capabilities/TwitchMembershipCapability");
var TwitchTagsCapability_1 = require("./Capabilities/TwitchTagsCapability");
var ClearMsg_1 = require("./Capabilities/TwitchTagsCapability/MessageTypes/ClearMsg");
var TwitchPrivateMessage_1 = require("./StandardCommands/TwitchPrivateMessage");
var Decorators_1 = require("./Toolkit/Decorators");
var UserTools_1 = require("./Toolkit/UserTools");
var GENERIC_CHANNEL = 'twjs';
/**
 * An interface to Twitch chat.
 *
 * @inheritDoc
 * @hideProtected
 */
var ChatClient = /** @class */ (function (_super) {
    tslib_1.__extends(ChatClient, _super);
    /**
     * Creates a new Twitch chat client.
     *
     * @expandParams
     *
     * @param twitchClient The {@TwitchClient} instance to use for API requests.
     * @param options
     */
    function ChatClient(twitchClient, options) {
        var _this = 
        /* eslint-disable no-restricted-syntax */
        _super.call(this, {
            connection: {
                hostName: options.webSocket === false ? 'irc.chat.twitch.tv' : 'irc-ws.chat.twitch.tv',
                secure: options.ssl !== false
            },
            credentials: {
                nick: ''
            },
            webSocket: options.webSocket !== false,
            logLevel: options.logLevel,
            nonConformingCommands: ['004']
        }) || this;
        _this._authVerified = false;
        /**
         * Fires when a user is timed out from a channel.
         *
         * @eventListener
         * @param channel The channel the user is timed out from.
         * @param user The timed out user.
         * @param reason The reason for the timeout.
         * @param duration The duration of the timeout, in seconds.
         */
        _this.onTimeout = _this.registerEvent();
        /**
         * Fires when a user is permanently banned from a channel.
         *
         * @eventListener
         * @param channel The channel the user is banned from.
         * @param user The banned user.
         * @param reason The reason for the ban.
         */
        _this.onBan = _this.registerEvent();
        /**
         * Fires when a user upgrades their bits badge in a channel.
         *
         * @eventListener
         * @param channel The channel where the bits badge was upgraded.
         * @param user The user that has upgraded their bits badge.
         * @param ritualInfo Additional information about the upgrade.
         * @param msg The raw message that was received.
         */
        _this.onBitsBadgeUpgrade = _this.registerEvent();
        /**
         * Fires when the chat of a channel is cleared.
         *
         * @eventListener
         * @param channel The channel whose chat is cleared.
         */
        _this.onChatClear = _this.registerEvent();
        /**
         * Fires when emote-only mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where emote-only mode is being toggled.
         * @param enabled Whether emote-only mode is being enabled. If false, it's being disabled.
         */
        _this.onEmoteOnly = _this.registerEvent();
        /**
         * Fires when followers-only mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where followers-only mode is being toggled.
         * @param enabled Whether followers-only mode is being enabled. If false, it's being disabled.
         * @param delay The time a user needs to follow the channel to be able to talk. Only available when `enabled === true`.
         */
        _this.onFollowersOnly = _this.registerEvent();
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
        _this.onHost = _this.registerEvent();
        /**
         * Fires when a channel you're logged in as its owner is being hosted by another channel.
         *
         * @eventListener
         * @param channel The channel that is being hosted.
         * @param byChannel The hosting channel.
         * @param auto Whether the host was triggered automatically (by Twitch's auto-host functionality).
         * @param viewers The number of viewers in the hosting channel.
         */
        _this.onHosted = _this.registerEvent();
        /**
         * Fires when Twitch tells you the number of hosts you have remaining in the next half hour for the channel
         * for which you're logged in as owner after hosting a channel.
         *
         * @eventListener
         * @param channel The hosting channel.
         * @param numberOfHosts The number of hosts remaining in the next half hour.
         */
        _this.onHostsRemaining = _this.registerEvent();
        /**
         * Fires when a user joins a channel.
         *
         * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
         *
         * @eventListener
         * @param channel The channel that is being joined.
         * @param user The user that joined.
         */
        _this.onJoin = _this.registerEvent();
        /**
         * Fires when a user leaves ("parts") a channel.
         *
         * The join/part events are cached by the Twitch chat server and will be batched and sent every 30-60 seconds.
         *
         * @eventListener
         * @param channel The channel that is being left.
         * @param user The user that left.
         */
        _this.onPart = _this.registerEvent();
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
        _this.onMessageRemove = _this.registerEvent();
        /**
         * Fires when R9K mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where R9K mode is being toggled.
         * @param enabled Whether R9K mode is being enabled. If false, it's being disabled.
         */
        _this.onR9k = _this.registerEvent();
        /**
         * Fires when host mode is disabled in a channel.
         *
         * @eventListener
         * @param channel The channel where host mode is being disabled.
         */
        _this.onUnhost = _this.registerEvent();
        /**
         * Fires when a user raids a channel.
         *
         * @eventListener
         * @param channel The channel that was raided.
         * @param user The user that has raided the channel.
         * @param raidInfo Additional information about the raid.
         * @param msg The raw message that was received.
         */
        _this.onRaid = _this.registerEvent();
        /**
         * Fires when a user cancels a raid.
         *
         * @eventListener
         * @param channel The channel where the raid was cancelled.
         * @param msg The raw message that was received.
         */
        _this.onRaidCancel = _this.registerEvent();
        /**
         * Fires when a user performs a "ritual" in a channel.
         *
         * @eventListener
         * @param channel The channel where the ritual was performed.
         * @param user The user that has performed the ritual.
         * @param ritualInfo Additional information about the ritual.
         * @param msg The raw message that was received.
         */
        _this.onRitual = _this.registerEvent();
        /**
         * Fires when slow mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where slow mode is being toggled.
         * @param enabled Whether slow mode is being enabled. If false, it's being disabled.
         * @param delay The time a user has to wait between sending messages. Only set when enabling slow mode.
         */
        _this.onSlow = _this.registerEvent();
        /**
         * Fires when sub only mode is toggled in a channel.
         *
         * @eventListener
         * @param channel The channel where sub only mode is being toggled.
         * @param enabled Whether sub only mode is being enabled. If false, it's being disabled.
         */
        _this.onSubsOnly = _this.registerEvent();
        /**
         * Fires when a user subscribes to a channel.
         *
         * @eventListener
         * @param channel The channel that was subscribed to.
         * @param user The subscribing user.
         * @param subInfo Additional information about the subscription.
         * @param msg The raw message that was received.
         */
        _this.onSub = _this.registerEvent();
        /**
         * Fires when a user resubscribes to a channel.
         *
         * @eventListener
         * @param channel The channel that was resubscribed to.
         * @param user The resubscribing user.
         * @param subInfo Additional information about the resubscription.
         * @param msg The raw message that was received.
         */
        _this.onResub = _this.registerEvent();
        /**
         * Fires when a user gifts a subscription to a channel to another user.
         *
         * @eventListener
         * @param channel The channel that was subscribed to.
         * @param user The user that the subscription was gifted to. The gifting user is defined in `subInfo.gifter`.
         * @param subInfo Additional information about the subscription.
         * @param msg The raw message that was received.
         */
        _this.onSubGift = _this.registerEvent();
        /**
         * Fires when a user gifts random subscriptions to the community of a channel.
         *
         * @eventListener
         * @param channel The channel that was subscribed to.
         * @param user The gifting user.
         * @param subInfo Additional information about the community subscription.
         * @param msg The raw message that was received.
         */
        _this.onCommunitySub = _this.registerEvent();
        /**
         * Fires when a user extends their subscription using a Sub Token.
         *
         * @eventListener
         * @param channel The channel where the subscription was extended.
         * @param user The user that extended their subscription.
         * @param subInfo Additional information about the subscription extension.
         * @param msg The raw message that was received.
         */
        _this.onSubExtend = _this.registerEvent();
        /**
         * Fires when a user upgrades their Prime subscription to a paid subscription in a channel.
         *
         * @eventListener
         * @param channel The channel where the subscription was upgraded.
         * @param user The user that upgraded their subscription.
         * @param subInfo Additional information about the subscription upgrade.
         * @param msg The raw message that was received.
         */
        _this.onPrimePaidUpgrade = _this.registerEvent();
        /**
         * Fires when a user upgrades their gift subscription to a paid subscription in a channel.
         *
         * @eventListener
         * @param channel The channel where the subscription was upgraded.
         * @param user The user that upgraded their subscription.
         * @param subInfo Additional information about the subscription upgrade.
         * @param msg The raw message that was received.
         */
        _this.onGiftPaidUpgrade = _this.registerEvent();
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
        _this.onPrimeCommunityGift = _this.registerEvent();
        /**
         * Fires when a user pays forward a subscription that was gifted to them to a specific user.
         *
         * @eventListener
         * @param channel The channel where the gift was forwarded.
         * @param user The user that forwarded the gift.
         * @param forwardInfo Additional information about the gift.
         * @param msg The raw message that was received.
         */
        _this.onStandardPayForward = _this.registerEvent();
        /**
         * Fires when a user pays forward a subscription that was gifted to them to the community.
         *
         * @eventListener
         * @param channel The channel where the gift was forwarded.
         * @param user The user that forwarded the gift.
         * @param forwardInfo Additional information about the gift.
         * @param msg The raw message that was received.
         */
        _this.onCommunityPayForward = _this.registerEvent();
        /**
         * Fires when receiving a whisper from another user.
         *
         * @eventListener
         * @param user The user that sent the whisper.
         * @param message The message text.
         * @param msg The raw message that was received.
         */
        _this.onWhisper = _this.registerEvent();
        /**
         * Fires when you tried to execute a command you don't have sufficient permission for.
         *
         * @eventListener
         * @param channel The channel that a command without sufficient permissions was executed on.
         * @param message The message text.
         */
        _this.onNoPermission = _this.registerEvent();
        /**
         * Fires when a message you tried to send gets rejected by the ratelimiter.
         *
         * @eventListener
         * @param channel The channel that was attempted to send to.
         * @param message The message text.
         */
        _this.onMessageRatelimit = _this.registerEvent();
        /**
         * Fires when authentication fails.
         *
         * @eventListener
         * @param channel The channel that a command without sufficient permissions was executed on.
         * @param message The message text.
         */
        _this.onAuthenticationFailure = _this.registerEvent();
        /**
         * Fires when sending a message fails.
         *
         * @eventListener
         * @param channel The channel that rejected the message.
         * @param reason The reason for the failure, e.g. you're banned (msg_banned)
         */
        _this.onMessageFailed = _this.registerEvent();
        // internal events to resolve promises and stuff
        _this._onBanResult = _this.registerEvent();
        _this._onTimeoutResult = _this.registerEvent();
        _this._onUnbanResult = _this.registerEvent();
        _this._onColorResult = _this.registerEvent();
        _this._onCommercialResult = _this.registerEvent();
        _this._onDeleteMessageResult = _this.registerEvent();
        _this._onEmoteOnlyResult = _this.registerEvent();
        _this._onEmoteOnlyOffResult = _this.registerEvent();
        _this._onFollowersOnlyResult = _this.registerEvent();
        _this._onFollowersOnlyOffResult = _this.registerEvent();
        _this._onHostResult = _this.registerEvent();
        _this._onUnhostResult = _this.registerEvent();
        _this._onModResult = _this.registerEvent();
        _this._onUnmodResult = _this.registerEvent();
        _this._onModsResult = _this.registerEvent();
        _this._onJoinResult = _this.registerEvent();
        _this._onR9kResult = _this.registerEvent();
        _this._onR9kOffResult = _this.registerEvent();
        _this._onSlowResult = _this.registerEvent();
        _this._onSlowOffResult = _this.registerEvent();
        _this._onSubsOnlyResult = _this.registerEvent();
        _this._onSubsOnlyOffResult = _this.registerEvent();
        _this._onVipResult = _this.registerEvent();
        _this._onUnvipResult = _this.registerEvent();
        _this._onVipsResult = _this.registerEvent();
        /* eslint-enable no-restricted-syntax */
        _this._chatLogger = new logger_1.default({ name: 'twitch-chat', emoji: true, minLevel: options.logLevel });
        _this._twitchClient = twitchClient;
        _this._useLegacyScopes = !!options.legacyScopes;
        _this._readOnly = !!options.readOnly;
        // tslint:disable:no-floating-promises
        _this.registerCapability(TwitchTagsCapability_1.default);
        _this.registerCapability(TwitchCommandsCapability_1.default);
        if (options.requestMembershipEvents) {
            _this.registerCapability(TwitchMembershipCapability_1.default);
        }
        // tslint:enable:no-floating-promises
        _this.onRegister(function () {
            _this._authVerified = true;
            _this._authFailureMessage = undefined;
        });
        _this.onMessage(ClearChat_1.default, function (clearChat) {
            var _a = clearChat.params, channel = _a.channel, user = _a.user, tags = clearChat.tags;
            if (user) {
                var duration = tags.get('ban-duration');
                var reason = tags.get('ban-reason');
                if (duration === undefined) {
                    // ban
                    _this.emit(_this.onBan, channel, user, reason, clearChat);
                }
                else {
                    // timeout
                    _this.emit(_this.onTimeout, channel, user, reason, Number(duration), clearChat);
                    _this.emit(_this._onTimeoutResult, channel, user, reason, Number(duration), clearChat);
                }
            }
            else {
                // full chat clear
                _this.emit(_this.onChatClear, channel);
            }
        });
        _this.onMessage(ClearMsg_1.default, function (msg) {
            var channel = msg.params.channel, targetMessageId = msg.targetMessageId;
            _this.emit(_this.onMessageRemove, channel, targetMessageId, msg);
        });
        _this.onMessage(HostTarget_1.default, function (_a) {
            var _b = _a.params, channel = _b.channel, targetAndViewers = _b.targetAndViewers;
            var _c = tslib_1.__read(targetAndViewers.split(' '), 2), target = _c[0], viewers = _c[1];
            if (target === '-') {
                // unhost
                _this.emit(_this.onUnhost, channel);
            }
            else {
                var numViewers = Number(viewers);
                _this.emit(_this.onHost, channel, target, isNaN(numViewers) ? undefined : numViewers);
            }
        });
        _this.onMessage(Commands_1.ChannelJoin, function (_a) {
            var prefix = _a.prefix, channel = _a.params.channel;
            _this.emit(_this.onJoin, channel, prefix.nick);
        });
        _this.onMessage(Commands_1.ChannelPart, function (_a) {
            var prefix = _a.prefix, channel = _a.params.channel;
            _this.emit(_this.onPart, channel, prefix.nick);
        });
        _this.onMessage(TwitchPrivateMessage_1.default, function (_a) {
            var prefix = _a.prefix, _b = _a.params, channel = _b.target, message = _b.message;
            if (prefix && prefix.nick === 'jtv') {
                // 1 = who hosted
                // 2 = auto-host or not
                // 3 = how many viewers (not always present)
                var match = message.match(ChatClient.HOST_MESSAGE_REGEX);
                if (match) {
                    _this.emit(_this.onHosted, channel, match[1], Boolean(match[2]), match[3] === '' ? undefined : Number(match[3]));
                }
            }
        });
        _this.onMessage(RoomState_1.default, function (_a) {
            var channel = _a.params.channel, tags = _a.tags;
            var isInitial = false;
            if (tags.has('subs-only') && tags.has('slow')) {
                // this is the full state - so we just successfully joined
                _this.emit(_this._onJoinResult, channel, tags);
                isInitial = true;
            }
            if (tags.has('slow')) {
                var slowDelay = Number(tags.get('slow'));
                if (slowDelay) {
                    _this.emit(_this._onSlowResult, channel, slowDelay);
                    if (!isInitial) {
                        _this.emit(_this.onSlow, channel, true, slowDelay);
                    }
                }
                else {
                    _this.emit(_this._onSlowOffResult, channel);
                    if (!isInitial) {
                        _this.emit(_this.onSlow, channel, false);
                    }
                }
            }
            if (tags.has('followers-only')) {
                var followDelay = Number(tags.get('followers-only'));
                if (followDelay === -1) {
                    _this.emit(_this._onFollowersOnlyOffResult, channel);
                    if (!isInitial) {
                        _this.emit(_this.onFollowersOnly, channel, false);
                    }
                }
                else {
                    _this.emit(_this._onFollowersOnlyResult, channel, followDelay);
                    if (!isInitial) {
                        _this.emit(_this.onFollowersOnly, channel, true, followDelay);
                    }
                }
            }
        });
        _this.onMessage(UserNotice_1.default, function (userNotice) {
            var _a = userNotice.params, channel = _a.channel, message = _a.message, tags = userNotice.tags;
            var messageType = tags.get('msg-id');
            switch (messageType) {
                case 'sub':
                case 'resub': {
                    var event_1 = messageType === 'sub' ? _this.onSub : _this.onResub;
                    var plan = tags.get('msg-param-sub-plan');
                    var streakMonths = tags.get('msg-param-streak-months');
                    var subInfo = {
                        userId: tags.get('user-id'),
                        displayName: tags.get('display-name'),
                        plan: plan,
                        planName: tags.get('msg-param-sub-plan-name'),
                        isPrime: plan === 'Prime',
                        months: Number(tags.get('msg-param-cumulative-months')),
                        streak: streakMonths ? Number(streakMonths) : undefined,
                        message: message
                    };
                    _this.emit(event_1, channel, tags.get('login'), subInfo, userNotice);
                    break;
                }
                case 'subgift':
                case 'anonsubgift': {
                    var plan = tags.get('msg-param-sub-plan');
                    var gifter = tags.get('login');
                    var isAnon = messageType === 'anonsubgift' || gifter === 'ananonymousgifter';
                    var subInfo = {
                        userId: tags.get('msg-param-recipient-id'),
                        displayName: tags.get('msg-param-recipient-display-name'),
                        gifter: isAnon ? undefined : gifter,
                        gifterUserId: isAnon ? undefined : tags.get('user-id'),
                        gifterDisplayName: isAnon ? undefined : tags.get('display-name'),
                        gifterGiftCount: isAnon ? undefined : Number(tags.get('msg-param-sender-count')),
                        plan: plan,
                        planName: tags.get('msg-param-sub-plan-name'),
                        isPrime: plan === 'Prime',
                        months: Number(tags.get('msg-param-months'))
                    };
                    _this.emit(_this.onSubGift, channel, tags.get('msg-param-recipient-user-name'), subInfo, userNotice);
                    break;
                }
                case 'anonsubmysterygift':
                case 'submysterygift': {
                    var gifter = tags.get('login');
                    var isAnon = messageType === 'anonsubmysterygift' || gifter === 'ananonymousgifter';
                    var communitySubInfo = {
                        gifter: isAnon ? undefined : gifter,
                        gifterUserId: isAnon ? undefined : tags.get('user-id'),
                        gifterDisplayName: isAnon ? undefined : tags.get('display-name'),
                        gifterGiftCount: isAnon ? undefined : Number(tags.get('msg-param-sender-count')),
                        count: Number(tags.get('msg-param-mass-gift-count')),
                        plan: tags.get('msg-param-sub-plan')
                    };
                    _this.emit(_this.onCommunitySub, channel, tags.get('login'), communitySubInfo, userNotice);
                    break;
                }
                case 'primepaidupgrade': {
                    var upgradeInfo = {
                        userId: tags.get('user-id'),
                        displayName: tags.get('display-name'),
                        plan: tags.get('msg-param-sub-plan')
                    };
                    _this.emit(_this.onPrimePaidUpgrade, channel, tags.get('login'), upgradeInfo, userNotice);
                    break;
                }
                case 'giftpaidupgrade': {
                    var upgradeInfo = {
                        userId: tags.get('user-id'),
                        displayName: tags.get('display-name'),
                        plan: tags.get('msg-param-sub-plan'),
                        gifter: tags.get('msg-param-sender-login'),
                        gifterDisplayName: tags.get('msg-param-sender-name')
                    };
                    _this.emit(_this.onGiftPaidUpgrade, channel, tags.get('login'), upgradeInfo, userNotice);
                    break;
                }
                case 'standardpayforward': {
                    var wasAnon = tags.get('msg-param-prior-gifter-anonymous') === 'true';
                    var forwardInfo = {
                        userId: tags.get('user-id'),
                        displayName: tags.get('display-name'),
                        originalGifterUserId: wasAnon ? undefined : tags.get('msg-param-prior-gifter-id'),
                        originalGifterDisplayName: wasAnon
                            ? undefined
                            : tags.get('msg-param-prior-gifter-display-name'),
                        recipientUserId: tags.get('msg-param-recipient-id'),
                        recipientDisplayName: tags.get('msg-param-recipient-display-name')
                    };
                    _this.emit(_this.onStandardPayForward, channel, tags.get('login'), forwardInfo, userNotice);
                    break;
                }
                case 'communitypayforward': {
                    var wasAnon = tags.get('msg-param-prior-gifter-anonymous') === 'true';
                    var forwardInfo = {
                        userId: tags.get('user-id'),
                        displayName: tags.get('display-name'),
                        originalGifterUserId: wasAnon ? undefined : tags.get('msg-param-prior-gifter-id'),
                        originalGifterDisplayName: wasAnon
                            ? undefined
                            : tags.get('msg-param-prior-gifter-display-name')
                    };
                    _this.emit(_this.onCommunityPayForward, channel, tags.get('login'), forwardInfo, userNotice);
                    break;
                }
                case 'primecommunitygiftreceived': {
                    var giftInfo = {
                        name: tags.get('msg-param-gift-name'),
                        gifter: tags.get('login'),
                        gifterDisplayName: tags.get('display-name')
                    };
                    _this.emit(_this.onPrimeCommunityGift, channel, tags.get('msg-param-recipient'), giftInfo, userNotice);
                    break;
                }
                case 'raid': {
                    var raidInfo = {
                        displayName: tags.get('msg-param-displayName'),
                        viewerCount: Number(tags.get('msg-param-viewerCount'))
                    };
                    _this.emit(_this.onRaid, channel, tags.get('login'), raidInfo, userNotice);
                    break;
                }
                case 'unraid': {
                    _this.emit(_this.onRaidCancel, channel, userNotice);
                    break;
                }
                case 'ritual': {
                    var ritualInfo = {
                        ritualName: tags.get('msg-param-ritual-name'),
                        message: message
                    };
                    _this.emit(_this.onRitual, channel, tags.get('login'), ritualInfo, userNotice);
                    break;
                }
                case 'bitsbadgetier': {
                    var badgeUpgradeInfo = {
                        displayName: tags.get('display-name'),
                        threshold: Number(tags.get('msg-param-threshold'))
                    };
                    _this.emit(_this.onBitsBadgeUpgrade, channel, tags.get('login'), badgeUpgradeInfo, userNotice);
                    break;
                }
                case 'extendsub': {
                    var extendInfo = {
                        userId: tags.get('user-id'),
                        displayName: tags.get('display-name'),
                        plan: tags.get('msg-param-sub-plan'),
                        months: Number(tags.get('msg-param-cumulative-months')),
                        endMonth: Number(tags.get('msg-param-sub-benefit-end-month'))
                    };
                    _this.emit(_this.onSubExtend, channel, tags.get('login'), extendInfo, userNotice);
                    break;
                }
                default: {
                    _this._chatLogger.warn("Unrecognized usernotice ID: " + messageType);
                }
            }
        });
        _this.onMessage(Whisper_1.default, function (whisper) {
            _this.emit(_this.onWhisper, whisper.prefix.nick, whisper.params.message, whisper);
        });
        _this.onMessage(Commands_1.Notice, function (userNotice) {
            var _a = userNotice.params, channel = _a.target, message = _a.message, tags = userNotice.tags;
            var messageType = tags.get('msg-id');
            // this event handler involves a lot of parsing strings you shouldn't parse...
            // but Twitch doesn't give us the required info in tags (╯°□°）╯︵ ┻━┻
            // (this code also might not do the right thing with foreign character display names...)
            switch (messageType) {
                // ban
                case 'already_banned': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onBanResult, channel, user, messageType);
                    }
                    break;
                }
                case 'bad_ban_self': {
                    _this.emit(_this._onBanResult, channel, _this._credentials.nick, messageType);
                    break;
                }
                case 'bad_ban_broadcaster': {
                    _this.emit(_this._onBanResult, channel, UserTools_1.toUserName(channel), messageType);
                    break;
                }
                case 'bad_ban_admin':
                case 'bad_ban_global_mod':
                case 'bad_ban_staff': {
                    var match = message.match(/^You cannot ban (?:\w+ )+?(\w+)\.$/);
                    if (match) {
                        _this.emit(_this._onBanResult, channel, match[1].toLowerCase(), messageType);
                    }
                    break;
                }
                case 'ban_success': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onBanResult, channel, user);
                    }
                    break;
                }
                // unban
                case 'bad_unban_no_ban': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnbanResult, channel, user, messageType);
                    }
                    break;
                }
                case 'unban_success': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnbanResult, channel, user);
                    }
                    break;
                }
                // color
                case 'turbo_only_color': {
                    _this.emit(_this._onColorResult, messageType);
                    break;
                }
                case 'color_changed': {
                    _this.emit(_this._onColorResult);
                    break;
                }
                // commercial
                case 'bad_commercial_error': {
                    _this.emit(_this._onCommercialResult, channel, messageType);
                    break;
                }
                case 'commercial_success': {
                    _this.emit(_this._onCommercialResult, channel);
                    break;
                }
                // delete message
                case 'bad_delete_message_error':
                case 'bad_delete_message_broadcaster':
                case 'bad_delete_message_mod': {
                    _this.emit(_this._onDeleteMessageResult, channel, messageType);
                    break;
                }
                case 'delete_message_success': {
                    _this.emit(_this._onDeleteMessageResult, channel);
                    break;
                }
                // emote only
                case 'already_emote_only_on': {
                    _this.emit(_this._onEmoteOnlyResult, channel, messageType);
                    break;
                }
                case 'emote_only_on': {
                    _this.emit(_this._onEmoteOnlyResult, channel);
                    _this.emit(_this.onEmoteOnly, channel, true);
                    break;
                }
                // emote only off
                case 'already_emote_only_off': {
                    _this.emit(_this._onEmoteOnlyOffResult, channel, messageType);
                    break;
                }
                case 'emote_only_off': {
                    _this.emit(_this._onEmoteOnlyOffResult, channel);
                    _this.emit(_this.onEmoteOnly, channel, false);
                    break;
                }
                // host
                case 'bad_host_hosting':
                case 'bad_host_rate_exceeded':
                case 'bad_host_error': {
                    _this.emit(_this._onHostResult, channel, messageType);
                    break;
                }
                case 'hosts_remaining': {
                    var remainingHostsFromChar = +message[0];
                    var remainingHosts = isNaN(remainingHostsFromChar) ? 0 : Number(remainingHostsFromChar);
                    _this.emit(_this._onHostResult, channel);
                    _this.emit(_this.onHostsRemaining, channel, remainingHosts);
                    break;
                }
                // unhost (only fails, success is handled by HOSTTARGET)
                case 'not_hosting': {
                    _this.emit(_this._onUnhostResult, channel, messageType);
                    break;
                }
                // join (success is handled when ROOMSTATE comes in)
                case 'msg_channel_suspended': {
                    _this.emit(_this._onJoinResult, channel, undefined, messageType);
                    break;
                }
                // mod
                case 'bad_mod_banned':
                case 'bad_mod_mod': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onModResult, channel, user, messageType);
                    }
                    break;
                }
                case 'mod_success': {
                    var match = message.match(/^You have added (\w+) /);
                    if (match) {
                        _this.emit(_this._onModResult, channel, match[1]);
                    }
                    break;
                }
                // unmod
                case 'bad_unmod_mod': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnmodResult, channel, user, messageType);
                    }
                    break;
                }
                case 'unmod_success': {
                    var match = message.match(/^You have removed (\w+) /);
                    if (match) {
                        _this.emit(_this._onUnmodResult, channel, match[1]);
                    }
                    break;
                }
                // mods
                case 'no_mods': {
                    _this.emit(_this._onModsResult, channel, []);
                    break;
                }
                case 'room_mods': {
                    var _b = tslib_1.__read(message.split(': '), 2), modList = _b[1];
                    var mods = modList.split(', ');
                    _this.emit(_this._onModsResult, channel, mods);
                    break;
                }
                // r9k
                case 'already_r9k_on': {
                    _this.emit(_this._onR9kResult, channel, messageType);
                    break;
                }
                case 'r9k_on': {
                    _this.emit(_this._onR9kResult, channel);
                    _this.emit(_this.onR9k, channel, true);
                    break;
                }
                // r9k off
                case 'already_r9k_off': {
                    _this.emit(_this._onR9kOffResult, channel, messageType);
                    break;
                }
                case 'r9k_off': {
                    _this.emit(_this._onR9kOffResult, channel);
                    _this.emit(_this.onR9k, channel, false);
                    break;
                }
                // subs only
                case 'already_subs_on': {
                    _this.emit(_this._onSubsOnlyResult, channel, messageType);
                    break;
                }
                case 'subs_on': {
                    _this.emit(_this._onSubsOnlyResult, channel);
                    _this.emit(_this.onSubsOnly, channel, true);
                    break;
                }
                // subs only off
                case 'already_subs_off': {
                    _this.emit(_this._onSubsOnlyOffResult, channel, messageType);
                    break;
                }
                case 'subs_off': {
                    _this.emit(_this._onSubsOnlyOffResult, channel);
                    _this.emit(_this.onSubsOnly, channel, false);
                    break;
                }
                // timeout (only fails, success is handled by CLEARCHAT)
                case 'bad_timeout_self': {
                    _this.emit(_this._onTimeoutResult, channel, _this._credentials.nick, undefined, undefined, undefined, messageType);
                    break;
                }
                case 'bad_timeout_broadcaster': {
                    _this.emit(_this._onTimeoutResult, channel, UserTools_1.toUserName(channel), undefined, undefined, undefined, messageType);
                    break;
                }
                case 'bad_timeout_admin':
                case 'bad_timeout_global_mod':
                case 'bad_timeout_staff': {
                    var match = message.match(/^You cannot ban (?:\w+ )+?(\w+)\.$/);
                    if (match) {
                        _this.emit(_this._onTimeoutResult, channel, match[1].toLowerCase(), undefined, undefined, undefined, messageType);
                    }
                    break;
                }
                // vip
                case 'bad_vip_grantee_banned':
                case 'bad_vip_grantee_already_vip': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onVipResult, channel, user, messageType);
                    }
                    break;
                }
                case 'vip_success': {
                    var match = message.match(/^You have added (\w+) /);
                    if (match) {
                        _this.emit(_this._onVipResult, channel, match[1]);
                    }
                    break;
                }
                // unvip
                case 'bad_unvip_grantee_not_vip': {
                    var match = message.split(' ');
                    var user = match && /^\w+$/.test(match[0]) ? match[0] : undefined;
                    if (user) {
                        _this.emit(_this._onUnvipResult, channel, user, messageType);
                    }
                    break;
                }
                case 'unvip_success': {
                    var match = message.match(/^You have removed (\w+) /);
                    if (match) {
                        _this.emit(_this._onUnvipResult, channel, match[1]);
                    }
                    break;
                }
                // vips
                case 'no_vips': {
                    _this.emit(_this._onVipsResult, channel, []);
                    break;
                }
                case 'vips_success': {
                    var _c = tslib_1.__read(message.split(': '), 2), vipList = _c[1];
                    var vips = vipList.split(', ');
                    _this.emit(_this._onVipsResult, channel, vips);
                    break;
                }
                case 'cmds_available': {
                    // do we really care?
                    break;
                }
                // there's other messages that show us the following things...
                // ...like ROOMSTATE...
                case 'followers_on':
                case 'followers_on_zero':
                case 'followers_off':
                case 'slow_on':
                case 'slow_off': {
                    break;
                }
                // ...and CLEARCHAT...
                case 'timeout_success': {
                    break;
                }
                // ...and HOSTTARGET
                case 'host_off':
                case 'host_on':
                case 'host_target_went_offline': {
                    break;
                }
                case 'unrecognized_cmd': {
                    break;
                }
                case 'no_permission': {
                    _this.emit(_this.onNoPermission, channel, message);
                    break;
                }
                case 'msg_ratelimit': {
                    _this.emit(_this.onMessageRatelimit, channel, message);
                    break;
                }
                case 'msg_banned': {
                    _this.emit(_this.onMessageFailed, channel, messageType);
                    break;
                }
                case undefined: {
                    // this might be one of these weird authentication error notices that don't have a msg-id...
                    if (message === 'Login authentication failed' ||
                        message === 'Improperly formatted AUTH' ||
                        message === 'Invalid NICK') {
                        _this._authVerified = false;
                        _this._authFailureMessage = message;
                        _this.emit(_this.onAuthenticationFailure, message);
                        _this._connection.disconnect();
                    }
                    break;
                }
                default: {
                    if (!messageType || messageType.substr(0, 6) !== 'usage_') {
                        _this._chatLogger.warn("Unrecognized notice ID: '" + messageType + "'");
                    }
                }
            }
        });
        return _this;
    }
    /**
     * Creates a new Twitch chat client with the user info from the TwitchClient instance.
     *
     * @expandParams
     *
     * @param twitchClient The TwitchClient instance to use for user info and API requests.
     * @param options
     */
    ChatClient.forTwitchClient = function (twitchClient, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new this(twitchClient, options)];
            });
        });
    };
    /**
     * Creates a new anonymous Twitch chat client.
     *
     * @expandParams
     *
     * @param options
     */
    ChatClient.anonymous = function (options) {
        if (options === void 0) { options = {}; }
        return new this(undefined, options);
    };
    ChatClient.prototype.connect = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._twitchClient) {
                            this._updateCredentials({
                                nick: ChatClient._generateJustinfanNick(),
                                password: undefined
                            });
                        }
                        return [4 /*yield*/, _super.prototype.connect.call(this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO swap arguments in 4.0
    /**
     * Hosts a channel on another channel.
     *
     * @param target The host target, i.e. the channel that is being hosted.
     * @param channel The host source, i.e. the channel that is hosting. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.host = function (target, channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onHostResult(function (chan, error) {
                            if (UserTools_1.toUserName(chan) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/host " + target);
                    })];
            });
        });
    };
    /**
     * Ends any host on a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * If you don't need this feedback, consider using {@ChatClient#unhostOutside} instead.
     *
     * @param channel The channel to end the host on. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.unhost = function (channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onUnhostResult(function (chan, error) {
                            if (UserTools_1.toUserName(chan) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/unhost');
                    })];
            });
        });
    };
    /**
     * Ends any host on a channel.
     *
     * This works even when not in the channel that was hosted, but provides no feedback about success of the command.
     *
     * If you need feedback about success, use {@ChatClient#unhost} (but make sure you're in the channel you are hosting).
     *
     * @param channel The channel to end the host on. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.unhostOutside = function (channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        this.say(channel, '/unhost');
    };
    /**
     * Bans a user from a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * @param channel The channel to ban the user from. Defaults to the channel of the connected user.
     * @param user The user to ban from the channel.
     * @param reason The reason for the ban.
     */
    ChatClient.prototype.ban = function (channel, user, reason) {
        if (channel === void 0) { channel = this._credentials.nick; }
        if (reason === void 0) { reason = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onBanResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/ban " + user + " " + reason);
                    })];
            });
        });
    };
    /**
     * Clears all messages in a channel.
     *
     * This only works when in the channel that was hosted in order to provide feedback about success of the command.
     *
     * @param channel The channel to ban the user from. Defaults to the channel of the connected user.
     */
    ChatClient.prototype.clear = function (channel) {
        if (channel === void 0) { channel = this._credentials.nick; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve) {
                        var e = _this.onChatClear(function (_channel) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                resolve();
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/clear');
                    })];
            });
        });
    };
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
    ChatClient.prototype.changeColor = function (color) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onColorResult(function (error) {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                            _this.removeListener(e);
                        });
                        _this.say(GENERIC_CHANNEL, "/color " + color);
                    })];
            });
        });
    };
    /**
     * Runs a commercial break on a channel.
     *
     * @param channel The channel to run the commercial break on.
     * @param duration The duration of the commercial break.
     */
    ChatClient.prototype.runCommercial = function (channel, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onCommercialResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/commercial " + duration);
                    })];
            });
        });
    };
    /**
     * Deletes a message from a channel.
     *
     * @param channel The channel to delete the message from.
     * @param message The message (as message ID or message object) to delete.
     */
    ChatClient.prototype.deleteMessage = function (channel, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var messageId;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                messageId = message instanceof Commands_1.PrivateMessage ? message.tags.get('id') : message;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onDeleteMessageResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/delete " + messageId);
                    })];
            });
        });
    };
    /**
     * Enables emote-only mode in a channel.
     *
     * @param channel The channel to enable emote-only mode in.
     */
    ChatClient.prototype.enableEmoteOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onEmoteOnlyResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/emoteonly');
                    })];
            });
        });
    };
    /**
     * Disables emote-only mode in a channel.
     *
     * @param channel The channel to disable emote-only mode in.
     */
    ChatClient.prototype.disableEmoteOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onEmoteOnlyOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/emoteonlyoff');
                    })];
            });
        });
    };
    /**
     * Enables followers-only mode in a channel.
     *
     * @param channel The channel to enable followers-only mode in.
     * @param delay The time (in minutes) a user needs to be following before being able to send messages.
     */
    ChatClient.prototype.enableFollowersOnly = function (channel, delay) {
        if (delay === void 0) { delay = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onFollowersOnlyResult(function (_channel, _delay, error) {
                            if (UserTools_1.toUserName(_channel) === channel && _delay === delay) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/followers " + (delay || ''));
                    })];
            });
        });
    };
    /**
     * Disables followers-only mode in a channel.
     *
     * @param channel The channel to disable followers-only mode in.
     */
    ChatClient.prototype.disableFollowersOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onFollowersOnlyOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/followersoff');
                    })];
            });
        });
    };
    /**
     * Gives a user moderator rights in a channel.
     *
     * @param channel The channel to give the user moderator rights in.
     * @param user The user to give moderator rights.
     */
    ChatClient.prototype.mod = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onModResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/mod " + user);
                    })];
            });
        });
    };
    /**
     * Takes moderator rights from a user in a channel.
     *
     * @param channel The channel to remove the user's moderator rights in.
     * @param user The user to take moderator rights from.
     */
    ChatClient.prototype.unmod = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onUnmodResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/unmod " + user);
                    })];
            });
        });
    };
    /**
     * Retrieves a list of moderators in a channel.
     *
     * @param channel The channel to retrieve the moderators of.
     */
    ChatClient.prototype.getMods = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve) {
                        var e = _this._onModsResult(function (_channel, mods) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                resolve(mods);
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/mods');
                    })];
            });
        });
    };
    /**
     * Enables r9k mode in a channel.
     *
     * @param channel The channel to enable r9k mode in.
     */
    ChatClient.prototype.enableR9k = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onR9kResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/r9kbeta');
                    })];
            });
        });
    };
    /**
     * Disables r9k mode in a channel.
     *
     * @param channel The channel to disable r9k mode in.
     */
    ChatClient.prototype.disableR9k = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onR9kOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/r9kbetaoff');
                    })];
            });
        });
    };
    /**
     * Enables slow mode in a channel.
     *
     * @param channel The channel to enable slow mode in.
     * @param delay The time (in seconds) a user needs to wait between messages.
     */
    ChatClient.prototype.enableSlow = function (channel, delay) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSlowResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/slow');
                    })];
            });
        });
    };
    /**
     * Disables slow mode in a channel.
     *
     * @param channel The channel to disable slow mode in.
     */
    ChatClient.prototype.disableSlow = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSlowOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/slowoff');
                    })];
            });
        });
    };
    /**
     * Enables subscribers-only mode in a channel.
     *
     * @param channel The channel to enable subscribers-only mode in.
     */
    ChatClient.prototype.enableSubsOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSubsOnlyResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/subscribers');
                    })];
            });
        });
    };
    /**
     * Disables subscribers-only mode in a channel.
     *
     * @param channel The channel to disable subscribers-only mode in.
     */
    ChatClient.prototype.disableSubsOnly = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onSubsOnlyOffResult(function (_channel, error) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/subscribersoff');
                    })];
            });
        });
    };
    /**
     * Times out a user in a channel and removes all their messages.
     *
     * @param channel The channel to time out the user in.
     * @param user The user to time out.
     * @param duration The time (in seconds) until the user can send messages again. Defaults to 1 minute.
     * @param reason
     */
    ChatClient.prototype.timeout = function (channel, user, duration, reason) {
        if (duration === void 0) { duration = 60; }
        if (reason === void 0) { reason = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onTimeoutResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/timeout " + user + " " + duration + " " + reason);
                    })];
            });
        });
    };
    /**
     * Removes all messages of a user from a channel.
     *
     * @param channel The channel to purge the user's messages from.
     * @param user The user to purge.
     * @param reason The reason for the purge.
     */
    ChatClient.prototype.purge = function (channel, user, reason) {
        if (reason === void 0) { reason = ''; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.timeout(channel, user, 1, reason)];
            });
        });
    };
    /**
     * Gives a user VIP status in a channel.
     *
     * @param channel The channel to give the user VIP status in.
     * @param user The user to give VIP status.
     */
    ChatClient.prototype.addVIP = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onVipResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/vip " + user);
                    })];
            });
        });
    };
    /**
     * Takes VIP status from a user in a channel.
     *
     * @param channel The channel to remove the user's VIP status in.
     * @param user The user to take VIP status from.
     */
    ChatClient.prototype.removeVIP = function (channel, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                user = UserTools_1.toUserName(user);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var e = _this._onUnvipResult(function (_channel, _user, error) {
                            if (UserTools_1.toUserName(_channel) === channel && UserTools_1.toUserName(_user) === user) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, "/unvip " + user);
                    })];
            });
        });
    };
    /**
     * Retrieves a list of moderators in a channel.
     *
     * @param channel The channel to retrieve the moderators of.
     */
    ChatClient.prototype.getVIPs = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toUserName(channel);
                return [2 /*return*/, new Promise(function (resolve) {
                        var e = _this._onVipsResult(function (_channel, vips) {
                            if (UserTools_1.toUserName(_channel) === channel) {
                                resolve(vips);
                                _this.removeListener(e);
                            }
                        });
                        _this.say(channel, '/vips');
                    })];
            });
        });
    };
    /**
     * Sends a message to a channel.
     *
     * @param channel The channel to send the message to.
     * @param message The message to send.
     */
    ChatClient.prototype.say = function (channel, message) {
        _super.prototype.say.call(this, UserTools_1.toChannelName(channel), message);
    };
    /**
     * Sends an action message (/me) to a channel.
     *
     * @param channel The channel to send the message to.
     * @param message The message to send.
     */
    ChatClient.prototype.action = function (channel, message) {
        _super.prototype.action.call(this, UserTools_1.toChannelName(channel), message);
    };
    /**
     * Sends a whisper message to another user.
     *
     * @param user The user to send the message to.
     * @param message The message to send.
     */
    ChatClient.prototype.whisper = function (user, message) {
        _super.prototype.say.call(this, GENERIC_CHANNEL, "/w " + UserTools_1.toUserName(user) + " " + message);
    };
    /**
     * Joins a channel.
     *
     * @param channel The channel to join.
     */
    ChatClient.prototype.join = function (channel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                channel = UserTools_1.toChannelName(channel);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var timer;
                        var e = _this._onJoinResult(function (chan, state, error) {
                            if (chan === channel) {
                                clearTimeout(timer);
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve();
                                }
                                _this.removeListener(e);
                            }
                        });
                        timer = setTimeout(function () {
                            _this.removeListener(e);
                            reject(new Error("Did not receive a reply to join " + channel + " in time; assuming that the join failed"));
                        }, 10000);
                        _super.prototype.join.call(_this, channel);
                    })];
            });
        });
    };
    /**
     * Disconnects from the chat server.
     */
    ChatClient.prototype.quit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        if (_this._connection) {
                            var thatConnection_1 = _this._connection;
                            var handler_1 = function () {
                                thatConnection_1.removeListener('disconnect', handler_1);
                                resolve();
                            };
                            thatConnection_1.addListener('disconnect', handler_1);
                            thatConnection_1.disconnect();
                        }
                    })];
            });
        });
    };
    /**
     * Waits for authentication (or "registration" in IRC terms) to finish.
     *
     * @deprecated Use the `onRegister` event instead.
     */
    ChatClient.prototype.waitForRegistration = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authListener;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._registered) {
                            return [2 /*return*/];
                        }
                        if (this._authFailureMessage) {
                            throw new Error("Registration failed. Response from Twitch: " + this._authFailureMessage);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, Promise.race([
                                new Promise(function (resolve, reject) {
                                    authListener = _this.onAuthenticationFailure(function (message) {
                                        reject(Error("Registration failed. Response from Twitch: " + message));
                                    });
                                }),
                                _super.prototype.waitForRegistration.call(this)
                            ])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (authListener) {
                            this.removeListener(authListener);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatClient.prototype.registerCoreMessageTypes = function () {
        _super.prototype.registerCoreMessageTypes.call(this);
        this.registerMessageType(TwitchPrivateMessage_1.default);
    };
    ChatClient.prototype.getPassword = function (currentPassword) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var scopes, accessToken, token, e_1, newToken, token, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._twitchClient) {
                            return [2 /*return*/, undefined];
                        }
                        if (currentPassword && this._authVerified) {
                            this._chatLogger.debug2('Password assumed to be correct from last connection');
                            return [2 /*return*/, currentPassword];
                        }
                        if (this._useLegacyScopes) {
                            scopes = ['chat_login'];
                        }
                        else if (this._readOnly) {
                            scopes = ['chat:read'];
                        }
                        else {
                            scopes = ['chat:read', 'chat:edit'];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this._twitchClient.getAccessToken(scopes)];
                    case 2:
                        accessToken = _a.sent();
                        if (!accessToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._twitchClient.getTokenInfo()];
                    case 3:
                        token = _a.sent();
                        if (token.valid) {
                            this._updateCredentials({
                                nick: token.userName
                            });
                            return [2 /*return*/, "oauth:" + accessToken.accessToken];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this._chatLogger.err("Retrieving an access token failed: " + e_1.message);
                        return [3 /*break*/, 6];
                    case 6:
                        this._chatLogger.warning('No valid token available; trying to refresh');
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 11, , 12]);
                        return [4 /*yield*/, this._twitchClient.refreshAccessToken()];
                    case 8:
                        newToken = _a.sent();
                        if (!newToken) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._twitchClient.getTokenInfo()];
                    case 9:
                        token = _a.sent();
                        if (token.valid) {
                            this._updateCredentials({
                                nick: token.userName
                            });
                            return [2 /*return*/, "oauth:" + newToken.accessToken];
                        }
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        this._chatLogger.err("Refreshing the access token failed: " + e_2.message);
                        return [3 /*break*/, 12];
                    case 12:
                        this._authVerified = false;
                        throw new Error('Could not retrieve a valid token');
                }
            });
        });
    };
    ChatClient._generateJustinfanNick = function () {
        var randomSuffix = Math.floor(Math.random() * 100000)
            .toString()
            .padStart(5, '0');
        return "justinfan" + randomSuffix;
    };
    ChatClient.HOST_MESSAGE_REGEX = /(\w+) is now ((?:auto[- ])?)hosting you(?: for (?:up to )?(\d+))?/;
    tslib_1.__decorate([
        Decorators_1.NonEnumerable
    ], ChatClient.prototype, "_twitchClient", void 0);
    return ChatClient;
}(ircv3_1.default));
exports.default = ChatClient;
//# sourceMappingURL=ChatClient.js.map