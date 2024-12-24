import JSONFormatter from "json-formatter-js";
const socket = new WebSocket('ws://localhost:7959');
socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const formatter = new JSONFormatter(JSON.parse(data.data));
let mode = data.mode

document.body.appendChild(formatter.render());
if(mode == 'dark'){
    document.body.style.backgroundColor = '#1a1a1a'
document.body.style.color = 'white'
document.body.style.zoom = '125%'
}

    
};





