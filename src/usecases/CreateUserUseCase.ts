import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    birthDate,
    userName,
  }: ICreateUserDTO): Promise<User> {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(email)) {
      throw new Error("Email is not valid");
    }

    const emailValidation = await this.userRepository.findByEmail({ email });

    if (emailValidation) {
      throw new Error("Email already exists");
    }

    const userNameValidation = await this.userRepository.findByUserName({
      userName,
    });

    if (userNameValidation) {
      throw new Error("UserName already exists");
    }

    return this.userRepository.createUser({
      name,
      email,
      birthDate,
      userName,
    });
  }
}
