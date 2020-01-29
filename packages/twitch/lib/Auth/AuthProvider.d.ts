import AccessToken from '../API/AccessToken';
/**
 * Describes a class that manages and supplies access tokens.
 *
 * Ideally, it should be able to request a new access token via user input
 * when previously unauthorized scopes are requested.
 *
 * As a starting point, {@StaticAuthProvider} takes an access token,
 * but can't do anything to upgrade it by itself. {@RefreshableAuthProvider}
 * is used as a wrapper around another `AuthProvider` and can make use of
 * refresh tokens.
 */
interface AuthProvider {
    /**
     * The client ID.
     */
    clientId: string;
    /**
     * The scopes that are currently available using the access token.
     */
    currentScopes: string[];
    /**
     * Retrieves an access token from the provider.
     *
     * This should automatically request a new token when the current token
     * is not authorized to use the requested scope(s).
     *
     * When implementing this, you should not do anything major when no
     * scopes are requested - the cached token should be valid for that -
     * unless you know exactly what you're doing.
     *
     * @param scopes The requested scope(s).
     */
    getAccessToken(scopes?: string | string[]): Promise<AccessToken | null>;
    /** @private */
    setAccessToken(token: AccessToken): void;
    /**
     * Requests that the provider fetches a new token from Twitch.
     *
     * This method is optional to implement. For some use cases,
     * it might not be desirable to e.g. ask the user to log in
     * again at just any time.
     */
    refresh?(): Promise<AccessToken>;
}
export default AuthProvider;
