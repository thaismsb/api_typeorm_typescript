"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdUseCase = void 0;
const UserRepository_1 = require("../repositories/implementations/UserRepository");
class GetUserByIdUseCase {
    async execute({ id }) {
        const userRepository = new UserRepository_1.UserRepository();
        const idValidation = await userRepository.findById({ id });
        if (!idValidation) {
            return new Error("User does not exists");
        }
        return idValidation;
    }
}
exports.GetUserByIdUseCase = GetUserByIdUseCase;
