import { inject, injectable } from "tsyringe";
import { IUserRepository } from "~/repositories/IUserRepository";
import { AppError } from "~/Classes/AppError";
@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById({ id });

    if (!user) {
      throw new AppError("User does not exists", 404);
    }

    return user;
  }
}
