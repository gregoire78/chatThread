import TwitchClient from '../../../TwitchClient';
import HelixExtensionProductData from './HelixExtensionProductData';
/** @private */
export interface HelixExtensionTransactionData {
    id: string;
    timestamp: string;
    broadcaster_id: string;
    broadcaster_name: string;
    user_id: string;
    user_name: string;
    product_type: string;
    product_data: HelixExtensionProductData;
}
/**
 * A bits transaction made inside an extension.
 */
export default class HelixExtensionTransaction {
    private readonly _data;
    private readonly _client;
    /** @private */
    constructor(_data: HelixExtensionTransactionData, client: TwitchClient);
    /**
     * The ID of the transaction.
     */
    get id(): string;
    /**
     * The time when the transaction was made.
     */
    get transactionDate(): Date;
    /**
     * The ID of the broadcaster that runs the extension on their channel.
     */
    get broadcasterId(): string;
    /**
     * The display name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterDisplayName(): string;
    /**
     * Retrieves information about the broadcaster that runs the extension on their channel.
     */
    getBroadcaster(): Promise<import("../User/HelixUser").default | null>;
    /**
     * The ID of the user that made the transaction.
     */
    get userId(): string;
    /**
     * The display name of the user that made the transaction.
     */
    get userDisplayName(): string;
    /**
     * Retrieves information about the user that made the transaction.
     */
    getUser(): Promise<import("../User/HelixUser").default | null>;
    /**
     * The product type.
     */
    get productType(): string;
    /**
     * The product SKU.
     */
    get productSKU(): string;
    /**
     * The cost of the product, in bits.
     */
    get productCost(): number;
    /**
     * The display name of the product.
     */
    get productDisplayName(): string;
    /**
     * Whether the product is in development.
     */
    get productInDevelopment(): boolean;
}
