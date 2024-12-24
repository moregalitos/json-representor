import WebSocket from 'ws';
import http from 'http'
import path from 'path'
import fs from "fs"
import open from "open"
export function json(data:string,{mode}:{
    mode :"dark" | "light"
}){
   
const ws_port = 7959
const wss = new WebSocket.Server({port:ws_port});

wss.on('error', console.error);

wss.on('connection', function open(ws) {
    const _data = {
        data,
        mode,
    }
  ws.send(JSON.stringify(_data));
});
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./browser/index.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading the HTML file');
                console.log(err);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req?.url?.startsWith('/dist/')) {
        const filePath = `./browser/${req.url}`;
     
        const extname = path.extname(filePath);
  
        
        let contentType = 'text/plain';
        if (extname === '.js') {
            contentType = 'application/javascript';
        } else if (extname === '.css') {
            contentType = 'text/css';
        } else if (extname === '.jpg' || extname === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (extname === '.png') {
            contentType = 'image/png';
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                console.log(err)
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
open(`http://localhost:${port}`)
}



