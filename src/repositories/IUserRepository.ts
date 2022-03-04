import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IFindByIdDTO } from "../dtos/IFindByIdDTO";
import { IFindByUserNameDTO } from "../dtos/IFindByUserNameDTO";
import { IFindByEmailDTO } from "../dtos/IFindByEmailDTO";
import {IDeleteUserDTO} from "../dtos/IDeleteUserDTO"
import {IFindByNameAndEmailDTO } from "../dtos/IFindByNameAndEmailDTO";

interface IUserRepository {
  createUser: (payload: ICreateUserDTO) => Promise<User>;
  findById: (payload: IFindByIdDTO) => Promise<User>;
  findByEmail: (payload: IFindByEmailDTO) => Promise<User>;
  findByUserName: (payload: IFindByUserNameDTO) => Promise<User>;
  updateUser: (id: string,payload: IUpdateUserDTO) => Promise<Partial<User>>
  deleteUser: (payload: IDeleteUserDTO) => Promise<void>
  findByNameAndEmail: (payload: IFindByNameAndEmailDTO) => Promise<User[]>;
}

export { IUserRepository };
