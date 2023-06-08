"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userScema = new mongoose_1.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});
const UserModel = (0, mongoose_1.model)("User", userScema, "users");
exports.default = UserModel;
