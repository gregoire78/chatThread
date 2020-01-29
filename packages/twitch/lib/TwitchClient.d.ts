import AccessToken from './API/AccessToken';
import BadgesAPI from './API/Badges/BadgesAPI';
import HelixAPIGroup from './API/Helix/HelixAPIGroup';
import { CheermoteBackground, CheermoteScale, CheermoteState } from './API/Kraken/Bits/CheermoteList';
import KrakenAPIGroup from './API/Kraken/KrakenAPIGroup';
import TokenInfo from './API/TokenInfo';
import UnsupportedAPI from './API/Unsupported/UnsupportedAPI';
import AuthProvider from './Auth/AuthProvider';
import { RefreshConfig } from './Auth/RefreshableAuthProvider';
/**
 * Default configuration for the cheermote API.
 */
export interface TwitchCheermoteConfig {
    /**
     * The default background type.
     */
    defaultBackground: CheermoteBackground;
    /**
     * The default cheermote state.
     */
    defaultState: CheermoteState;
    /**
     * The default cheermote scale.
     */
    defaultScale: CheermoteScale;
}
/**
 * Configuration for a {@TwitchClient} instance.
 */
export interface TwitchConfig {
    /**
     * An authentication provider that supplies tokens to the client.
     *
     * For more information, see the {@AuthProvider} documentation.
     */
    authProvider: AuthProvider;
    /**
     * Whether to authenticate the client before a request is made.
     */
    preAuth: boolean;
    /**
     * The scopes to request with the initial request, even if it's not necessary for the request.
     */
    initialScopes?: string[];
    /**
     * Default values for fetched cheermotes.
     */
    cheermotes: TwitchCheermoteConfig;
}
/**
 * The endpoint to call, i.e. /kraken, /helix or a custom (potentially unsupported) endpoint.
 */
export declare enum TwitchAPICallType {
    /**
     * Call a Kraken API endpoint.
     */
    Kraken = 0,
    /**
     * Call a Helix API endpoint.
     */
    Helix = 1,
    /**
     * Call an authentication endpoint.
     */
    Auth = 2,
    /**
     * Call a custom (potentially unsupported) endpoint.
     */
    Custom = 3
}
/**
 * Configuration for a single API call.
 */
export interface TwitchAPICallOptions {
    /**
     * The URL to request.
     *
     * If `type` is not `'custom'`, this is relative to the respective API root endpoint. Otherwise, it is an absoulte URL.
     */
    url: string;
    /**
     * The endpoint to call, i.e. /kraken, /helix or a custom (potentially unsupported) endpoint.
     */
    type?: TwitchAPICallType;
    /**
     * The HTTP method to use. Defaults to `'GET'`.
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    /**
     * The query parameters to send with the API call.
     */
    query?: Record<string, string | string[] | undefined>;
    /**
     * The form body to send with the API call.
     *
     * If this is given, `jsonBody` will be ignored.
     */
    body?: Record<string, string | string[] | undefined>;
    /**
     * The JSON body to send with the API call.
     *
     * If `body` is also given, this will be ignored.
     */
    jsonBody?: any;
    /**
     * The scope the request needs.
     */
    scope?: string;
    /**
     * The Kraken API version to request with. Defaults to 5.
     *
     * If `type` is not `'kraken'`, this will be ignored.
     *
     * Note that v3 will be removed at some point and v5 will be the only Kraken version left, so you should only use this option if you want to rewrite everything in a few months.
     *
     * Internally, only v5 and Helix are used.
     */
    version?: number;
}
/**
 * The main entry point of this library. Manages API calls and the use of access tokens in these.
 */
export default class TwitchClient {
    /** @private */
    readonly _config: TwitchConfig;
    /**
     * Creates a new instance with fixed credentials.
     *
     * @param clientId The client ID of your application.
     * @param accessToken The access token to call the API with.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     * @param scopes The scopes your supplied token has.
     *
     * If this argument is given, the scopes need to be correct, or weird things might happen. If it's not (i.e. it's `undefined`), we fetch the correct scopes for you.
     *
     * If you can't exactly say which scopes your token has, don't use this parameter/set it to `undefined`.
     * @param refreshConfig Configuration to automatically refresh expired tokens.
     * @param config Additional configuration to pass to the constructor.
     *
     * Note that if you provide a custom `authProvider`, this method will overwrite it. In this case, you should use the constructor directly.
     */
    static withCredentials(clientId: string, accessToken?: string, scopes?: string[], refreshConfig?: RefreshConfig, config?: Partial<TwitchConfig>): Promise<TwitchClient>;
    /**
     * Creates a new instance with client credentials.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param config Additional configuration to pass to the constructor.
     *
     * Note that if you provide a custom `authProvider`, this method will overwrite it. In this case, you should use the constructor directly.
     */
    static withClientCredentials(clientId: string, clientSecret?: string, config?: Partial<TwitchConfig>): TwitchClient;
    /**
     * Makes a call to the Twitch API using given credetials.
     *
     * @param options The configuration of the call.
     * @param clientId The client ID of your application.
     * @param accessToken The access token to call the API with.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     */
    static callAPI<T = any>(options: TwitchAPICallOptions, clientId?: string, accessToken?: string): Promise<T>;
    /**
     * Retrieves an access token with your client credentials and an authorization code.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param code The authorization code.
     * @param redirectUri The redirect URI. This serves no real purpose here, but must still match with the redirect URI you configured in the Twitch Developer dashboard.
     */
    static getAccessToken(clientId: string, clientSecret: string, code: string, redirectUri: string): Promise<AccessToken>;
    /**
     * Retrieves an app access token with your client credentials.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param clientSecret
     */
    static getAppAccessToken(clientId: string, clientSecret: string): Promise<AccessToken>;
    /**
     * Refreshes an expired access token with your client credentials and the refresh token that was given by the initial authentication.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     * @param refreshToken The refresh token.
     */
    static refreshAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<AccessToken>;
    /**
     * Retrieves information about an access token.
     *
     * @param clientId The client ID of your application.
     * @param accessToken The access token to get the information of.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     */
    static getTokenInfo(clientId: string, accessToken: string): Promise<TokenInfo>;
    /**
     * Creates a new Twitch client instance.
     *
     * @param config Configuration for the client instance.
     */
    constructor(config: Partial<TwitchConfig>);
    /**
     * Retrieves information about your access token.
     */
    getTokenInfo(): Promise<TokenInfo>;
    /**
     * Retrieves an access token for the authentication provider.
     *
     * @param scopes The scopes to request.
     */
    getAccessToken(scopes?: string | string[]): Promise<AccessToken | null>;
    /**
     * Forces the authentication provider to refresh the access token, if possible.
     */
    refreshAccessToken(): Promise<AccessToken | undefined>;
    /**
     * Makes a call to the Twitch API using your access token.
     *
     * @param options The configuration of the call.
     */
    callAPI<T = any>(options: TwitchAPICallOptions): Promise<T>;
    /**
     * A group of Kraken API methods.
     */
    get kraken(): KrakenAPIGroup;
    /**
     * A group of Helix API methods.
     */
    get helix(): HelixAPIGroup;
    /**
     * The API methods that deal with badges.
     */
    get badges(): BadgesAPI;
    /**
     * Various API methods that are not officially supported by Twitch.
     */
    get unsupported(): UnsupportedAPI;
    private static _getUrl;
}