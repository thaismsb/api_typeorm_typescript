import { inject, injectable } from "tsyringe";
import { IUserRepository } from "~/repositories/IUserRepository";
import { AppError } from "~/Classes/AppError";
@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const idValidation = await this.userRepository.findById({ id });

    if (!idValidation) {
      throw new AppError("User does not exists", 404);
    }

    await this.userRepository.deleteUser({ id });

    return idValidation;
  }
}
