import { hash } from 'bcryptjs';

export interface IRequestCreateCredencial {
  email: string;
  password: string;
  senderId: string;
}

export default class CreateCredentialsUseCase {
  public async execute(data: IRequestCreateCredencial): Promise<any> {
    const hashedPassword = await hash(data.password, 8);
    const user = {
      email: data.email,
      password: hashedPassword,
    };

    return user;
  }
}
