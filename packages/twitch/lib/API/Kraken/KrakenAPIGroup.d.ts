import BaseAPI from '../BaseAPI';
import BitsAPI from './Bits/BitsAPI';
import ChannelAPI from './Channel/ChannelAPI';
import ChatAPI from './Chat/ChatAPI';
import SearchAPI from './Search/SearchAPI';
import StreamAPI from './Stream/StreamAPI';
import UserAPI from './User/UserAPI';
import TeamAPI from './Team/TeamAPI';
/**
 * Groups all API calls available in Kraken v5.
 *
 * Can be accessed using {@TwitchClient#kraken}.
 */
export default class KrakenAPIGroup extends BaseAPI {
    /**
     * The API methods that deal with bits.
     */
    get bits(): BitsAPI;
    /**
     * The API methods that deal with channels.
     */
    get channels(): ChannelAPI;
    /**
     * The API methods that deal with chat.
     */
    get chat(): ChatAPI;
    /**
     * The API methods that deal with searching.
     */
    get search(): SearchAPI;
    /**
     * The API methods that deal with streams.
     */
    get streams(): StreamAPI;
    /**
     * The API methods that deal with users.
     */
    get users(): UserAPI;
    /**
     * The API methods that deal with teams.
     */
    get teams(): TeamAPI;
}