import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import socketIo from "socket.io";

export const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

export const server = createServer(app);
export const io = socketIo(server);
