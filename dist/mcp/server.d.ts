import { Request, Response } from 'express';
/**
 * Handles SSE endpoint for MCP connection
 */
export declare function handleSSE(req: Request, res: Response): Promise<void>;
/**
 * Handles MCP message endpoint (tool calls)
 */
export declare function handleMessage(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=server.d.ts.map