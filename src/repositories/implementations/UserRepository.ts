import { getConnection, getRepository, Repository } from "typeorm";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "../../dtos/IFindByEmailDTO";
import { IFindByUserNameDTO } from "../../dtos/IFindByUserNameDTO";
import { IFindByIdDTO } from "../../dtos/IFindByIdDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IDeleteUserDTO } from "../../dtos/IDeleteUserDTO";
import { IFindByNameAndEmailDTO } from "../../dtos/IFindByNameAndEmailDTO";

class UserRepository implements IUserRepository {
  
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async createUser(payload: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(payload);

    await this.repository.save(user);

    return user;
  }

  async findById(payload: IFindByIdDTO): Promise<User> {
    return await this.repository.findOne({
      id: payload.id,
    });
  }

  async findByEmail(payload: IFindByEmailDTO): Promise<User> {
    return await this.repository.findOne({
      email: payload.email,
    });
  }

  async findByUserName(payload: IFindByUserNameDTO): Promise<User> {
    return await this.repository.findOne({
      userName: payload.userName,
    });
  }

  async updateUser(
    id: string,
    payload: IUpdateUserDTO
  ): Promise<Partial<User>> {
    const {
      raw: [firstUser],
    }: { raw: User[] } = await this.repository
      .createQueryBuilder()
      .update(User)
      .where("id = :id", { id })
      .set(payload)
      .returning("*")
      .updateEntity(false)
      .execute();

    return firstUser;
  }

  async deleteUser(payload:IDeleteUserDTO): Promise<void> {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: payload.id })
    .execute();
  }

  async findByNameAndEmail(payload: IFindByNameAndEmailDTO): Promise<User[]>{
    const { query } = payload;

     return await getConnection('user')
    .createQueryBuilder()
    .where(
      `LOWER(user.name) LIKE :query 
      OR LOWER(user.email) LIKE :query`,
      { query: `%${query.toLowerCase()}%` },
    )
    .getMany()

  }
 
}

export { UserRepository };