import { PrivateMessage } from 'ircv3/lib/Message/MessageTypes/Commands/';
import { CheermoteDisplayInfo, CheermoteList } from 'twitch';
import ChatUser from '../ChatUser';
export interface ParsedMessageTextPart {
    type: 'text';
    position: number;
    length: number;
    text: string;
}
export interface ParsedMessageCheerPart {
    type: 'cheer';
    position: number;
    length: number;
    name: string;
    amount: number;
    displayInfo: CheermoteDisplayInfo;
}
export interface ParsedMessageEmotePart {
    type: 'emote';
    position: number;
    length: number;
    id: string;
    name: string;
}
export declare type ParsedMessagePart = ParsedMessageTextPart | ParsedMessageCheerPart | ParsedMessageEmotePart;
declare class TwitchPrivateMessage extends PrivateMessage {
    get userInfo(): ChatUser;
    get channelId(): string | null;
    get isCheer(): boolean;
    get totalBits(): number;
    get emoteOffsets(): Map<string, string[]>;
    parseEmotes(overrideMessage?: string): ParsedMessagePart[];
    parseEmotesAndBits(cheermotes: CheermoteList, overrideMessage?: string): ParsedMessagePart[];
    private _parseEmotePositions;
    private _fillTextPositions;
}
export default TwitchPrivateMessage;
