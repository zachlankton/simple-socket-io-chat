#!/usr/bin/env node

var app = require('express')();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var wSpace;

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/test', (req, res) => {
    console.log(req.body);
  wSpace.emit("ws message", req.body);
  res.send("thanks!");
});


const workspaces = io.of(/^\/\w+$/);

workspaces.on('connection', socket => {
  const workspace = socket.nsp;
  wSpace = workspace;

  socket.on("ws message", (msg) => {
    workspace.emit("ws message", msg);
  });

});


http.listen(80, () => {});
