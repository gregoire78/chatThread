import BaseAPI from '../../BaseAPI';
import HelixPaginatedRequest from '../HelixPaginatedRequest';
import HelixPaginatedResult from '../HelixPaginatedResult';
import HelixPagination from '../HelixPagination';
import HelixGame, { HelixGameData } from './HelixGame';
/** @private */
export declare type HelixGameFilterType = 'id' | 'name';
/**
 * The Helix API methods that deal with games.
 *
 * Can be accessed using `client.helix.games` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const game = await client.helix.games.getGameByName('Hearthstone');
 * ```
 */
export default class HelixGameAPI extends BaseAPI {
    /**
     * Retrieves the game data for the given list of game IDs.
     *
     * @param ids The game IDs you want to look up.
     */
    getGamesByIds(ids: string[]): Promise<HelixGame[]>;
    /**
     * Retrieves the game data for the given list of game names.
     *
     * @param names The game names you want to look up.
     */
    getGamesByNames(names: string[]): Promise<HelixGame[]>;
    /**
     * Retrieves the game data for the given game ID.
     *
     * @param id The game ID you want to look up.
     */
    getGameById(id: string): Promise<HelixGame | null>;
    /**
     * Retrieves the game data for the given game name.
     *
     * @param name The game name you want to look up.
     */
    getGameByName(name: string): Promise<HelixGame | null>;
    /**
     * Retrieves a list of the most viewed games at the moment.
     *
     * @param pagination Pagination info.
     */
    getTopGames(pagination?: HelixPagination): Promise<HelixPaginatedResult<HelixGame>>;
    /**
     * Creates a paginator for the most viewed games at the moment.
     */
    getTopGamesPaginated(): HelixPaginatedRequest<HelixGameData, HelixGame>;
    private _getGames;
}
