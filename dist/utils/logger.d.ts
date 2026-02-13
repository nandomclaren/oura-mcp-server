/**
 * Simple logger utility that respects LOG_LEVEL environment variable
 * Levels: error, warn, info, debug
 */
declare class Logger {
    private level;
    constructor();
    private shouldLog;
    error(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    /**
     * Sanitize arguments to prevent logging sensitive data
     */
    private sanitizeArgs;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map