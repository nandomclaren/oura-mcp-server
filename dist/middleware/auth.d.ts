import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to authenticate MCP requests using API key
 */
export declare function authenticateMCP(req: Request, res: Response, next: NextFunction): void;
/**
 * Optional authentication middleware (allows unauthenticated requests)
 */
export declare function optionalAuth(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map