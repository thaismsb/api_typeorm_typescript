import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UserRepository } from "../repositories/implementations/UserRepository";

export class CreateUserUseCase {
  async execute({
    name,
    email,
    birthDate,
    userName,
  }: ICreateUserDTO): Promise<User | Error> {
    const userRepository = new UserRepository();

    //celebrate
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(email)) {
      return new Error("Email is not valid");
    }

    const emailValidation = await userRepository.findByEmail({ email });

    if (emailValidation) {
      return new Error("Email already exists");
    }

    const userNameValidation = await userRepository.findByUserName({
      userName,
    });

    if (userNameValidation) {
      return new Error("UserName already exists");
    }

    return await userRepository.createUser({
      name,
      email,
      birthDate,
      userName,
    });

  }
}
