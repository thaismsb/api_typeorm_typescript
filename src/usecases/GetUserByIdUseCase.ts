import { IFindByIdDTO } from "../dtos/IFindByIdDTO";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/implementations/UserRepository";

export class GetUserByIdUseCase {
  async execute({ id }: IFindByIdDTO): Promise<User | Error> {

    const userRepository = new UserRepository();

    const idValidation = await userRepository.findById({ id });

    if (!idValidation) {
      return new Error("User does not exists");
    }
    return idValidation;
  }
}
