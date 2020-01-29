import { UserIdResolvable } from '../../../Toolkit/UserTools';
import BaseAPI from '../../BaseAPI';
import HelixPaginatedRequest from '../HelixPaginatedRequest';
import HelixPaginatedResult from '../HelixPaginatedResult';
import HelixSubscription, { HelixSubscriptionData } from './HelixSubscription';
import HelixSubscriptionEvent, { HelixSubscriptionEventData } from './HelixSubscriptionEvent';
/**
 * The Helix API methods that deal with subscriptions.
 *
 * Can be accessed using `client.helix.subscriptions` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const subscriptions = await client.helix.subscriptions.getSubscriptionsForUsers('61369223', '125328655');
 * ```
 */
export default class HelixSubscriptionAPI extends BaseAPI {
    /**
     * Retrieves a list of all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     */
    getSubscriptions(broadcaster: UserIdResolvable): Promise<HelixPaginatedResult<HelixSubscription>>;
    /**
     * Creates a paginator for all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     */
    getSubscriptionsPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequest<HelixSubscriptionData, HelixSubscription>;
    /**
     * Retrieves the subset of the given user list that is subscribed to the given broadcaster.
     *
     * @param broadcaster The broadcaster to find subscriptions to.
     * @param users The users that should be checked for subscriptions.
     */
    getSubscriptionsForUsers(broadcaster: UserIdResolvable, users: UserIdResolvable[]): Promise<HelixSubscription[]>;
    /**
     * Retrieves the subscription data for a given user to a given broadcaster.
     *
     * @param broadcaster The broadcaster to check.
     * @param user The user to check.
     */
    getSubscriptionForUser(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<HelixSubscription | null>;
    /**
     * Retrieves the most recent subscription events for a given broadcaster.
     *
     * @param broadcaster The broadcaster to retrieve subscription events for.
     */
    getSubscriptionEventsForBroadcaster(broadcaster: UserIdResolvable): Promise<HelixPaginatedResult<HelixSubscriptionEvent>>;
    /**
     * Creates a paginator for the recent subscription events for a given broadcaster.
     *
     * @param broadcaster The broadcaster to retrieve subscription events for.
     */
    getSubscriptionEventsForBroadcasterPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequest<HelixSubscriptionEventData, HelixSubscriptionEvent>;
    /**
     * Retrieves a single subscription event by ID.
     *
     * @param id The event ID.
     */
    getSubscriptionEventById(id: string): Promise<HelixPaginatedResult<HelixSubscriptionEvent>>;
    private _getSubscriptionEvents;
}
