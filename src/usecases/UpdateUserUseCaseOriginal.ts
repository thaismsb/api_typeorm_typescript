import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { AppError } from "../Classes/AppError";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../entities/User";

@injectable()
export class UpdateUserUseCaseOriginal {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({
    id,
    name,
    email,
    birthDate,
    userName,
  }: IUpdateUserDTO): Promise<Partial<User>> {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new AppError("User does not exists");
    }

    const updatedUser = await this.userRepository.updateUser(id, {
      id,
      name,
      email,
      birthDate,
      userName,
    });

    if (!updatedUser) {
      throw new AppError("Ocorreu um problema ao cadastrar o usuárioq", 400);
    }

    return updatedUser;
  }
}
