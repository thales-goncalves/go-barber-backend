import User from '../infra/typeorm/entities/User';
import IUserCreateDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepositories {
  create(data: IUserCreateDTO): Promise<User>;
  save(data: IUserCreateDTO): Promise<User>;
  findByEmail(id: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
