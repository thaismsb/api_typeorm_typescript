import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO"
import { User } from "../entities/User"
import { UserRepository } from "../repositories/implementations/UserRepository"

export class UpdateUserUseCaseOriginal {
  async execute({
    id,
    name,
    email,
    birthDate,
    userName,
  }: IUpdateUserDTO): Promise<Partial<User> | Error> {
    const userRepository = new UserRepository();

    const idValidation = await userRepository.findById({ id });

    if (!idValidation) {
      throw new Error("User does not exists");
    }

    return await userRepository.updateUser(id, {
      id,
      name,
      email,
      birthDate,
      userName,
    });
  }
}

// const updateuser = await getRepository(User).findOne({ id });
// if (!updateuser) {
//   throw new Error("User does not exists");
// }

// updateuser.name = name ? name : updateuser.name;
// updateuser.email = email ? email : updateuser.email;
// updateuser.birthDate = birthDate ? birthDate : updateuser.birthDate;
// updateuser.userName = userName ? userName : updateuser.userName;

// await getRepository(User).save(updateuser);

// return updateuser;
