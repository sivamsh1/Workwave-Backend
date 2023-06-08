"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../../../adapters/authControllers");
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const userRepositoryMongoDB_1 = require("../../Database/Mongodb/repositories/userRepositoryMongoDB");
const authService_1 = require("../../Services/authService");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.authController)(userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, authService_1.authService, authServiceInterface_1.authServiceInterface);
    router.post('/user-register', controller.registerUser);
    return router;
};
exports.default = authRouter;
