import CustomError from './CustomError';
/**
 * Thrown whenever a HTTP error occurs. Some HTTP errors are handled in the library when they're expected.
 */
export default class HTTPStatusCodeError extends CustomError {
    private readonly _statusCode;
    private readonly _body;
    /** @private */
    constructor(statusCode: number, statusText: string, body: any);
    get statusCode(): number;
    get body(): any;
}
