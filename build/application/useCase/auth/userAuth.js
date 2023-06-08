"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const userRegister = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    user.email = user.email.toLocaleLowerCase();
    const isEmailExist = yield userRepository.getUserByEmail(user.email);
    if (isEmailExist) {
        token = "null";
    }
    else {
        user.password = authService.encryptPassword(user.password);
        const { _id: userId } = yield userRepository.addUser(user);
        token = authService.generateToken(userId.toString());
    }
    return token;
});
exports.userRegister = userRegister;
