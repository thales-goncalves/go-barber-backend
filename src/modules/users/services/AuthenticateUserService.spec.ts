import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticationUser', () => {
  it('should authenticate a valid user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'john@doe.com';
    const password = '000000';

    const user = await createUserService.execute({
      name: 'John Doe',
      email,
      password,
    });

    const response = await authenticateUserService.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not authenticate with invalid email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'john@doe.com';
    const password = '000000';

    expect(
      authenticateUserService.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate with invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const email = 'john@doe.com';
    const password = '000000';

    await createUserService.execute({
      name: 'John Doe',
      email,
      password,
    });

    expect(
      authenticateUserService.execute({
        email,
        password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
