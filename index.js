#!/usr/bin/env node

let app = require('express')();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.get('/', (req, res) => {
  console.log("GET /", req.socket.remoteAddress)
  res.sendFile(__dirname + '/index.html');
});

// Dynamic Namespaces
// The namespace that a client connects with is automatically created
const namespaces = io.of(/^\/\w+$/);

namespaces.on('connection', socket => {
  console.log("New Connection", socket.id)
  const workspace = socket.nsp;
  wSpace = workspace;

  socket.on("ws message", (msg) => {
    console.log("New Message on", socket.id)
    workspace.emit("ws message", msg);
  });

});

console.log("Starting Server @ port 80")
http.listen(80, () => {});
