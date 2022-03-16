import { inject, injectable } from "tsyringe";
import { IUserRepository } from "~/repositories/IUserRepository";
import { User } from "~/entities/User";
@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
