/**
 * Simple logger utility that respects LOG_LEVEL environment variable
 * Levels: error, warn, info, debug
 */
const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
class Logger {
    level;
    constructor() {
        const envLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
        this.level = LOG_LEVELS[envLevel] !== undefined ? envLevel : 'info';
    }
    shouldLog(level) {
        return LOG_LEVELS[level] <= LOG_LEVELS[this.level];
    }
    error(message, ...args) {
        if (this.shouldLog('error')) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }
    warn(message, ...args) {
        if (this.shouldLog('warn')) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }
    info(message, ...args) {
        if (this.shouldLog('info')) {
            console.log(`[INFO] ${message}`, ...args);
        }
    }
    debug(message, ...args) {
        if (this.shouldLog('debug')) {
            console.log(`[DEBUG] ${message}`, ...this.sanitizeArgs(args));
        }
    }
    /**
     * Sanitize arguments to prevent logging sensitive data
     */
    sanitizeArgs(args) {
        // In production, don't log potentially sensitive arguments
        if (process.env.NODE_ENV === 'production') {
            return args.map(arg => {
                if (typeof arg === 'object' && arg !== null) {
                    return '[Object - redacted in production]';
                }
                if (typeof arg === 'string' && arg.length > 100) {
                    return arg.substring(0, 100) + '... [truncated]';
                }
                return arg;
            });
        }
        return args;
    }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map