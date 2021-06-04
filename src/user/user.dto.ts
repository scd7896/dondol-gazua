import { User } from '.prisma/client';

export class CreateUserDto {
  user: Pick<User, 'email' | 'password'>;
}
