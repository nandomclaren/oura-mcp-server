#!/usr/bin/env node

/**
 * MCP Proxy for Claude Desktop
 *
 * This script acts as a local MCP server that forwards requests
 * to the remote Oura MCP server on Railway.
 */

const https = require('https');
const readline = require('readline');

const CONFIG = {
  serverUrl: 'web-production-8ca97.up.railway.app',
  authToken: '1d91dd1934cf4f51f1ddba7047686abed1aef3bdf3d9d087d4334192c7a231cb'
};

// Read JSON-RPC requests from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Forward request to remote MCP server
function forwardRequest(request) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(request);

    const options = {
      hostname: CONFIG.serverUrl,
      port: 443,
      path: '/sse',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.authToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Handle incoming JSON-RPC requests
rl.on('line', async (line) => {
  try {
    const request = JSON.parse(line);
    const response = await forwardRequest(request);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32603,
        message: error.message
      }
    }));
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  process.exit(0);
});

process.on('SIGINT', () => {
  process.exit(0);
});
