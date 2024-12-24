"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = json;
const ws_1 = __importDefault(require("ws"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const open_1 = __importDefault(require("open"));
function json(data, { mode }) {
    const ws_port = 7959;
    const wss = new ws_1.default.Server({ port: ws_port });
    wss.on('error', console.error);
    wss.on('connection', function open(ws) {
        const _data = {
            data,
            mode,
        };
        ws.send(JSON.stringify(_data));
    });
    const server = http_1.default.createServer((req, res) => {
        var _a;
        if (req.url === '/') {
            fs_1.default.readFile('./browser/index.html', 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading the HTML file');
                    console.log(err);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        }
        else if ((_a = req === null || req === void 0 ? void 0 : req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/dist/')) {
            const filePath = `./browser/${req.url}`;
            console.log(filePath);
            const extname = path_1.default.extname(filePath);
            console.log(extname);
            let contentType = 'text/plain';
            if (extname === '.js') {
                contentType = 'application/javascript';
            }
            else if (extname === '.css') {
                contentType = 'text/css';
            }
            else if (extname === '.jpg' || extname === '.jpeg') {
                contentType = 'image/jpeg';
            }
            else if (extname === '.png') {
                contentType = 'image/png';
            }
            fs_1.default.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                    console.log(err);
                    return;
                }
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            });
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found');
        }
    });
    const port = 3000;
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    (0, open_1.default)(`http://localhost:${port}`);
}
json(JSON.stringify({ n: 1 }), { mode: 'dark' });
