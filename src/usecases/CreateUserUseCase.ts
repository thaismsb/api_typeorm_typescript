import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/implementations/UserRepository";

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
  }: ICreateUserDTO): Promise<User | Error> {
    //const userRepository = new UserRepository();

    //celebrate
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(email)) {
      return new Error("Email is not valid");
    }

    const emailValidation = await this.userRepository.findByEmail({ email });

    if (emailValidation) {
      return new Error("Email already exists");
    }

    const userNameValidation = await this.userRepository.findByUserName({
      userName,
    });

    if (userNameValidation) {
      return new Error("UserName already exists");
    }

    return this.userRepository.createUser({
      name,
      email,
      birthDate,
      userName,
    });
  }
}
