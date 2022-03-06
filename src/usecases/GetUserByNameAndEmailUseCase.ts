import { IFindByNameAndEmailDTO } from "../dtos/IFindByNameAndEmailDTO";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/implementations/UserRepository";

export class GetUserByNameAndEmailUseCase {
  async execute({ name}: IFindByNameAndEmailDTO): Promise<User[] | Error> {
    const userRepository = new UserRepository();

    const search = await userRepository.findByNameAndEmail({ name });

    if (!search) {
      return new Error("No results found");
    }

    return search;
  }
}
