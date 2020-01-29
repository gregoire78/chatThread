import { extractUserId, UserIdResolvable } from '../../../Toolkit/UserTools';
import { Cacheable, Cached } from '../../../Toolkit/Decorators/Cache';
import CheermoteList, { CheermoteListData } from './CheermoteList';
import BaseAPI from '../../BaseAPI';

/**
 * The API methods that deal with Bits/Cheermotes.
 *
 * Can be accessed using `client.kraken.bits` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const cheermotes = await client.kraken.bits.getCheermotes();
 * ```
 */
@Cacheable
export default class BitsAPI extends BaseAPI {
	/**
	 * Retrieves global and channel cheermotes.
	 *
	 * @param channel The channel you want to retrieve the available cheermotes for.
	 * If not given, this method retrieves a list of globally available cheermotes.
	 * @param includeSponsored Whether to include sponsored cheermotes in the list.
	 */
	@Cached(3600)
	async getCheermotes(channel?: UserIdResolvable, includeSponsored: boolean = true) {
		const query: Record<string, string> = {};
		if (channel) {
			query.channel_id = extractUserId(channel);
		}
		if (includeSponsored) {
			query.include_sponsored = 'true';
		}

		const data = await this._client.callAPI<CheermoteListData>({ url: 'bits/actions', query });
		return new CheermoteList(data.actions, this._client);
	}
}
