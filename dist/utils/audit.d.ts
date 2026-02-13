/**
 * Audit logging for security events
 * Logs critical security events for compliance and forensics
 */
export declare enum AuditEventType {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
    OAUTH_INITIATED = "OAUTH_INITIATED",
    OAUTH_SUCCESS = "OAUTH_SUCCESS",
    OAUTH_FAILURE = "OAUTH_FAILURE",
    OAUTH_DISCONNECTED = "OAUTH_DISCONNECTED",
    TOKEN_REFRESH = "TOKEN_REFRESH",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    DATA_ACCESS = "DATA_ACCESS",
    SESSION_CREATED = "SESSION_CREATED",
    SESSION_EXPIRED = "SESSION_EXPIRED",
    INVALID_REQUEST = "INVALID_REQUEST"
}
/**
 * Logs an audit event
 * In production, this should write to a secure audit log storage
 */
export declare function auditLog(eventType: AuditEventType, success: boolean, details?: {
    userId?: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
}): void;
/**
 * Helper to get client IP from request (handles proxies)
 */
export declare function getClientIP(req: any): string;
//# sourceMappingURL=audit.d.ts.map