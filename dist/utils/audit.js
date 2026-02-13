/**
 * Audit logging for security events
 * Logs critical security events for compliance and forensics
 */
import { logger } from './logger.js';
export var AuditEventType;
(function (AuditEventType) {
    AuditEventType["AUTH_SUCCESS"] = "AUTH_SUCCESS";
    AuditEventType["AUTH_FAILURE"] = "AUTH_FAILURE";
    AuditEventType["OAUTH_INITIATED"] = "OAUTH_INITIATED";
    AuditEventType["OAUTH_SUCCESS"] = "OAUTH_SUCCESS";
    AuditEventType["OAUTH_FAILURE"] = "OAUTH_FAILURE";
    AuditEventType["OAUTH_DISCONNECTED"] = "OAUTH_DISCONNECTED";
    AuditEventType["TOKEN_REFRESH"] = "TOKEN_REFRESH";
    AuditEventType["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    AuditEventType["DATA_ACCESS"] = "DATA_ACCESS";
    AuditEventType["SESSION_CREATED"] = "SESSION_CREATED";
    AuditEventType["SESSION_EXPIRED"] = "SESSION_EXPIRED";
    AuditEventType["INVALID_REQUEST"] = "INVALID_REQUEST";
})(AuditEventType || (AuditEventType = {}));
/**
 * Logs an audit event
 * In production, this should write to a secure audit log storage
 */
export function auditLog(eventType, success, details) {
    const event = {
        timestamp: new Date().toISOString(),
        eventType,
        userId: details?.userId,
        ipAddress: details?.ipAddress,
        userAgent: details?.userAgent,
        details: sanitizeDetails(details?.metadata),
        success,
    };
    // Log to structured output
    logger.info(`[AUDIT] ${eventType}`, {
        ...event,
        // Ensure sensitive data is not logged
        details: event.details ? JSON.stringify(event.details) : undefined,
    });
    // In production, additionally write to:
    // - Separate audit log file with rotation
    // - SIEM system (Splunk, ELK, etc.)
    // - Cloud logging service (CloudWatch, Stackdriver, etc.)
}
/**
 * Sanitize audit details to prevent sensitive data leakage
 */
function sanitizeDetails(metadata) {
    if (!metadata)
        return undefined;
    const sanitized = {};
    const sensitiveKeys = [
        'token',
        'access_token',
        'refresh_token',
        'password',
        'secret',
        'key',
        'authorization',
        'auth',
    ];
    for (const [key, value] of Object.entries(metadata)) {
        const lowerKey = key.toLowerCase();
        // Check if key contains sensitive terms
        const isSensitive = sensitiveKeys.some(sensitiveKey => lowerKey.includes(sensitiveKey));
        if (isSensitive) {
            sanitized[key] = '[REDACTED]';
        }
        else if (typeof value === 'object' && value !== null) {
            // Recursively sanitize nested objects
            sanitized[key] = sanitizeDetails(value);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}
/**
 * Helper to get client IP from request (handles proxies)
 */
export function getClientIP(req) {
    return (req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.headers['x-real-ip'] ||
        req.socket?.remoteAddress ||
        req.connection?.remoteAddress ||
        'unknown');
}
//# sourceMappingURL=audit.js.map