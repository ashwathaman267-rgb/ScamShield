const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle URL cleaning
    let cleanUrl = req.url.split('?')[0];
    let filePath = path.join(__dirname, cleanUrl);

    // If root or directory, try index.html
    if (cleanUrl.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
    }

    // Proxy for Setu API (to bypass CORS)
    if (req.url.startsWith('/api/proxy/setu')) {
        let bodyChunks = [];
        req.on('data', chunk => { bodyChunks.push(chunk); });
        req.on('end', () => {
            const https = require('https');
            const targetPath = req.url.replace('/api/proxy/setu', '');
            const body = Buffer.concat(bodyChunks);
            
            const options = {
                hostname: 'uat-bifrost.setu.co',
                path: targetPath,
                method: req.method,
                headers: {
                    ...req.headers,
                    'host': 'uat-bifrost.setu.co',
                }
            };

            // Remove headers that might interfere
            delete options.headers['content-length'];
            options.headers['Content-Length'] = body.length;

            const proxyReq = https.request(options, proxyRes => {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res);
            });

            proxyReq.on('error', e => {
                console.error('Proxy Error:', e);
                res.writeHead(500);
                res.end(JSON.stringify({ error: e.message }));
            });

            if (body.length > 0) {
                proxyReq.write(body);
            }
            proxyReq.end();
        });
        return;
    }

    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            serveFile(filePath, res);
        } else {
            // SPA Fallback logic
            // If it looks like an asset request (has extension), return 404
            // Otherwise serve index.html
            const ext = path.extname(cleanUrl);
            if (ext) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                serveFile(path.join(__dirname, 'index.html'), res);
            }
        }
    });
});

function serveFile(filePath, res) {
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop');
});
