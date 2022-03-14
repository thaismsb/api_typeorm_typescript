"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersUseCase = void 0;
const UserRepository_1 = require("../repositories/implementations/UserRepository");
class GetAllUsersUseCase {
    async execute() {
        const userRepository = new UserRepository_1.UserRepository();
        return await userRepository.getAll();
    }
}
exports.GetAllUsersUseCase = GetAllUsersUseCase;
