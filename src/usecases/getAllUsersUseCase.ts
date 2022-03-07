import { User } from "../entities/User";
import { UserRepository } from "../repositories/implementations/UserRepository";

export class GetAllUsersUseCase {
    async execute(): Promise<User[]> {
  
      const userRepository = new UserRepository();
  
      return await userRepository.getAll();
    }
  }
  
