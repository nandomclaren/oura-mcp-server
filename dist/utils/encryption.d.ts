/**
 * Encrypts a token using AES-256-GCM
 * @param token - The token to encrypt
 * @returns Encrypted token in format: iv:authTag:encrypted
 */
export declare function encryptToken(token: string): string;
/**
 * Decrypts a token using AES-256-GCM
 * @param encryptedToken - The encrypted token in format: iv:authTag:encrypted
 * @returns Decrypted token
 */
export declare function decryptToken(encryptedToken: string): string;
/**
 * Generates a random encryption key
 * @returns Hex string of a 32-byte key
 */
export declare function generateEncryptionKey(): string;
/**
 * Validates that an encryption key is properly formatted
 * @param keyHex - The hex string to validate
 * @returns True if valid, false otherwise
 */
export declare function isValidEncryptionKey(keyHex: string): boolean;
//# sourceMappingURL=encryption.d.ts.map