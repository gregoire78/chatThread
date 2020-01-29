import BaseAPI from '../../BaseAPI';
import HelixPaginatedRequest from '../HelixPaginatedRequest';
import HelixPaginatedResult from '../HelixPaginatedResult';
import HelixPagination from '../HelixPagination';
import HelixExtensionTransaction, { HelixExtensionTransactionData } from './HelixExtensionTransaction';
/**
 * Filters for the extension transactions request.
 */
interface HelixExtensionTransactionsFilter {
    transactionIds?: string[];
}
/**
 * @inheritDoc
 */
interface HelixExtensionTransactionsPaginatedFilter extends HelixExtensionTransactionsFilter, HelixPagination {
}
/**
 * The Helix API methods that deal with extensions.
 *
 * Can be accessed using `client.helix.extensions` on a {@TwitchClient} instance.
 *
 * ## Example
 * ```ts
 * const client = await TwitchClient.withCredentials(clientId, accessToken);
 * const transactions = await client.helix.extionsions.getExtensionTransactions('abcd');
 * ```
 */
export default class HelixExtensionsAPI extends BaseAPI {
    /**
     * Retrieves a list of transactions for the given extension.
     *
     * @param extensionId The ID of the extension to retrieve transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactions(extensionId: string, filter?: HelixExtensionTransactionsPaginatedFilter): Promise<HelixPaginatedResult<HelixExtensionTransaction>>;
    /**
     * Creates a paginator for transactions for the given extension.
     *
     * @param extensionId The ID of the extension to retrieve transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactionsPaginated(extensionId: string, filter?: HelixExtensionTransactionsFilter): HelixPaginatedRequest<HelixExtensionTransactionData, HelixExtensionTransaction>;
}
export {};