"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (services) => {
    const encryptPassword = (password) => { services.encryptPassword(password); };
    const generateToken = (payload) => { return services.generateToken(payload); };
    return {
        encryptPassword,
        generateToken,
    };
};
exports.authServiceInterface = authServiceInterface;
