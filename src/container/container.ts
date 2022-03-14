import { container } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { UserRepository } from "../repositories/implementations/UserRepository";

export default (): void => {
  container.register<IUserRepository>("UserRepository", UserRepository);
};
