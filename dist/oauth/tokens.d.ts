import { OAuthTokens } from '../oura/types.js';
/**
 * Saves OAuth tokens to disk (encrypted)
 * @param tokens - The OAuth tokens to save
 */
export declare function saveTokens(tokens: OAuthTokens): Promise<void>;
/**
 * Loads OAuth tokens from disk (decrypted)
 * @returns The OAuth tokens or null if not found
 */
export declare function loadTokens(): Promise<OAuthTokens | null>;
/**
 * Clears stored tokens (for logout/disconnect)
 */
export declare function clearTokens(): Promise<void>;
/**
 * Checks if the access token is valid and not expired
 * @param tokens - The OAuth tokens to check
 * @returns True if valid, false otherwise
 */
export declare function isAccessTokenValid(tokens: OAuthTokens | null): boolean;
/**
 * Checks if the access token is expiring soon (within buffer time)
 * @param tokens - The OAuth tokens to check
 * @returns True if expiring soon, false otherwise
 */
export declare function isExpiringSoon(tokens: OAuthTokens | null): boolean;
/**
 * Checks if there is a valid refresh token
 * @param tokens - The OAuth tokens to check
 * @returns True if refresh token exists, false otherwise
 */
export declare function hasRefreshToken(tokens: OAuthTokens | null): boolean;
/**
 * Updates the cached tokens (useful when refreshing)
 * @param tokens - The new tokens to cache
 */
export declare function updateCachedTokens(tokens: OAuthTokens): void;
/**
 * Gets the current cached tokens
 * @returns The cached tokens or null
 */
export declare function getCachedTokens(): OAuthTokens | null;
/**
 * Checks if tokens file exists
 * @returns True if file exists, false otherwise
 */
export declare function tokensFileExists(): Promise<boolean>;
//# sourceMappingURL=tokens.d.ts.map