import AuthProvider from './AuthProvider';
import AccessToken from '../API/AccessToken';
/**
 * An auth provider that retrieve tokens using client credentials.
 */
export default class ClientCredentialsAuthProvider implements AuthProvider {
    private readonly _clientId;
    private readonly _clientSecret;
    private _token?;
    /**
     * Creates a new auth provider to receive an application token with using the client ID and secret.
     *
     * You don't usually have to create this manually. You should use `TwitchClient.withClientCredentials` instead.
     *
     * @param clientId The client ID of your application.
     * @param clientSecret The client secret of your application.
     *
     * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
     */
    constructor(clientId: string, clientSecret: string);
    /**
     * Retrieves an access token.
     *
     * If any scopes are provided, this throws. The client credentials flow does not support scopes.
     *
     * @param scopes The requested scopes.
     */
    getAccessToken(scopes?: string | string[]): Promise<AccessToken>;
    /**
     * Retrieves a new app access token.
     */
    refresh(): Promise<AccessToken>;
    /** @private */
    setAccessToken(token: AccessToken): void;
    /**
     * The client ID.
     */
    get clientId(): string;
    /**
     * The scopes that are currently available using the access token.
     */
    get currentScopes(): never[];
}