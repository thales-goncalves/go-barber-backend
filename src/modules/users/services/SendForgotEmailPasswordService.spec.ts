import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotEmailPasswordService from './SendForgotEmailPasswordService';

describe('SendForgotEmailPassword', () => {
  it('should be able to recover a password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendMail');

    const sendForgotPasswordEmailService = new SendForgotEmailPasswordService(
      fakeUsersRepository,
      fakeEmailProvider,
    );

    const email = 'test@example.com';

    await fakeUsersRepository.create({
      email,
      name: 'Test',
      password: '12345',
    });

    await sendForgotPasswordEmailService.execute({
      email,
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendForgotPasswordEmailService = new SendForgotEmailPasswordService(
      fakeUsersRepository,
      fakeEmailProvider,
    );

    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'test@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
