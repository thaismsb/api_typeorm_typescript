"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCaseOriginal = void 0;
const UserRepository_1 = require("../repositories/implementations/UserRepository");
class UpdateUserUseCaseOriginal {
    async execute({ id, name, email, birthDate, userName, }) {
        const userRepository = new UserRepository_1.UserRepository();
        const idValidation = await userRepository.findById({ id });
        if (!idValidation) {
            return new Error("User does not exists");
        }
        return await userRepository.updateUser(id, {
            id,
            name,
            email,
            birthDate,
            userName
        });
    }
}
exports.UpdateUserUseCaseOriginal = UpdateUserUseCaseOriginal;
// const updateuser = await getRepository(User).findOne({ id });
// if (!updateuser) {
//   return new Error("User does not exists");
// }
// updateuser.name = name ? name : updateuser.name;
// updateuser.email = email ? email : updateuser.email;
// updateuser.birthDate = birthDate ? birthDate : updateuser.birthDate;
// updateuser.userName = userName ? userName : updateuser.userName;
// await getRepository(User).save(updateuser);
// return updateuser;
