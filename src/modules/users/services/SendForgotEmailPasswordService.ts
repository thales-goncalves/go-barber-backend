import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExits = await this.usersRepository.findByEmail(email);

    if (!checkUserExits) {
      throw new AppError('User does not exist');
    }

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperaçào de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
