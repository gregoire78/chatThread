import HelixDateRangeData from '../HelixDateRangeData';
import TwitchClient from '../../../TwitchClient';
import HelixBitsLeaderboardEntry, { HelixBitsLeaderboardEntryData } from './HelixBitsLeaderboardEntry';
import HelixResponse from '../HelixResponse';
/** @private */
export interface HelixBitsLeaderboardResponse extends HelixResponse<HelixBitsLeaderboardEntryData> {
    date_range: HelixDateRangeData;
    total: number;
}
/**
 * A leaderboard where the users who used the most bits to a broadcaster are listed.
 */
export default class HelixBitsLeaderboard {
    private readonly _data;
    /** @private */
    protected readonly _client: TwitchClient;
    /** @private */
    constructor(_data: HelixBitsLeaderboardResponse, client: TwitchClient);
    /**
     * The entries of the leaderboard.
     */
    get entries(): HelixBitsLeaderboardEntry[];
    /**
     * The total amount of people on the requested leaderboard.
     */
    get totalCount(): number;
}
