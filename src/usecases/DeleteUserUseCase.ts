import { IDeleteUserDTO } from "../dtos/IDeleteUserDTO";
import { UserRepository } from "../repositories/implementations/UserRepository";
import { User } from "../entities/User";
export class DeleteUserUseCase {
  async execute({ id }: IDeleteUserDTO): Promise<void | Error> {
    const userRepository = new UserRepository();

    const idValidation = await userRepository.findById({ id });

    if (!idValidation) {
      return new Error("User does not exists");
    }
    return userRepository.deleteUser({id});

    
  }
}
