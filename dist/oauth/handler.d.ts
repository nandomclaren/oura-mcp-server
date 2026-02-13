import { Request, Response } from 'express';
import { OAuthTokens } from '../oura/types.js';
/**
 * Initiates OAuth2 authorization flow
 */
export declare function handleAuthorize(_req: Request, res: Response): void;
/**
 * Handles OAuth2 callback after user authorization
 */
export declare function handleCallback(req: Request, res: Response): Promise<void>;
/**
 * Refreshes the access token using refresh token
 */
export declare function refreshAccessToken(refreshToken: string): Promise<OAuthTokens>;
/**
 * Gets a valid access token, refreshing if necessary
 */
export declare function getValidAccessToken(): Promise<string>;
/**
 * Gets OAuth connection status
 */
export declare function getOAuthStatus(): Promise<{
    connected: boolean;
    expiresAt?: number;
    scope?: string;
}>;
/**
 * Disconnects OAuth (clears tokens)
 */
export declare function disconnectOAuth(): Promise<void>;
//# sourceMappingURL=handler.d.ts.map