import { arrayBuffer } from "node:stream/consumers";
import { IFindByNameAndEmailDTO } from "../dtos/IFindByNameAndEmailDTO";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/implementations/UserRepository";

export class GetUserByNameAndEmailUseCase {
  async execute({ query }: IFindByNameAndEmailDTO): Promise<User[]> {

    const userRepository = new UserRepository();

    const array = await userRepository.findByNameAndEmail({ query });
     
    return array;


  }
}
