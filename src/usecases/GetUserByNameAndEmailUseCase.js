"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByNameAndEmailUseCase = void 0;
const UserRepository_1 = require("../repositories/implementations/UserRepository");
class GetUserByNameAndEmailUseCase {
    async execute({ name }) {
        const userRepository = new UserRepository_1.UserRepository();
        const search = await userRepository.findByNameAndEmail({ name });
        if (!search) {
            return new Error("No results found");
        }
        return search;
    }
}
exports.GetUserByNameAndEmailUseCase = GetUserByNameAndEmailUseCase;
