"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./frameWorks/Database/Mongodb/connection"));
const express_2 = __importDefault(require("./frameWorks/Webserver/express"));
const routes_1 = __importDefault(require("./frameWorks/Webserver/routes"));
const server_1 = __importDefault(require("./frameWorks/Webserver/server"));
const cors_1 = __importDefault(require("cors"));
// Creating app and server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Enable CORS for specific origin
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
// Express configuration 
(0, express_2.default)(app);
//Server config and start
(0, server_1.default)(server).startServer();
// Connecting Database
(0, connection_1.default)();
// Routes For each end point
(0, routes_1.default)(app);
