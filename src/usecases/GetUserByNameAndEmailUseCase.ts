import { inject, injectable } from "tsyringe";
import { IUserRepository } from "~/repositories/IUserRepository";
import { AppError } from "~/Classes/AppError";
import { IFindByNameAndEmailDTO } from "../dtos/IFindByNameAndEmailDTO";
import { User } from "~/entities/User";

@injectable()
export class GetUserByNameAndEmailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name }: IFindByNameAndEmailDTO): Promise<User[]> {
    const search = await this.userRepository.findByNameAndEmail({ name });

    if (!search) {
      throw new AppError("No results found");
    }

    return search;
  }
}
