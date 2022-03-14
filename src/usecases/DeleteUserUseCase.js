"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
const UserRepository_1 = require("../repositories/implementations/UserRepository");
class DeleteUserUseCase {
    async execute({ id }) {
        const userRepository = new UserRepository_1.UserRepository();
        const idValidation = await userRepository.findById({ id });
        if (!idValidation) {
            return new Error("User does not exists");
        }
        return userRepository.deleteUser({ id });
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
