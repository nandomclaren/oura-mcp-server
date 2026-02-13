import { MCPTool, MCPToolCall, MCPResponse } from '../oura/types.js';
/**
 * List of all available MCP tools
 */
export declare const tools: MCPTool[];
/**
 * Executes a tool call and returns the result
 */
export declare function executeToolCall(toolCall: MCPToolCall): Promise<MCPResponse>;
//# sourceMappingURL=tools.d.ts.map