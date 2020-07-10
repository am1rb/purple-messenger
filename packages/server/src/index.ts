import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import socketIo from 'socket.io';

import auth from 'modules/auth';

const serverPort = 8000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const server = createServer(app);
const io = socketIo(server);

server.listen(serverPort, function() {
  console.log('server run on ' + serverPort);
});

io.on('connection', socket => {

  auth(socket);

  

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});