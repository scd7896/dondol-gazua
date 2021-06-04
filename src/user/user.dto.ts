import { User } from '.prisma/client';

export class UserDto {
  user: Pick<User, 'email' | 'password'>;
}
