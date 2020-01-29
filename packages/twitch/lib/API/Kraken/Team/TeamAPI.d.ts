import BaseAPI from '../../BaseAPI';
import { TeamData } from './Team';
import TeamWithUsers from './TeamWithUsers';
/**
 * The API methods that deal with teams.
 *
 * Can be accessed using `client.kraken.teams` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const team = await client.kraken.teams.getTeamByName('staff');
 * ```
 */
export default class TeamAPI extends BaseAPI {
    /**
     * Get a list of teams.
     *
     * @param page The result page you want to retrieve.
     * @param limit The number of results you want to retrieve.
     */
    getTeams(page?: number, limit?: number): Promise<TeamData[]>;
    /**
     * Retrieves the team data for the given team name.
     *
     * @param team The team name you want to look up.
     */
    getTeamByName(team: string): Promise<TeamWithUsers>;
}
