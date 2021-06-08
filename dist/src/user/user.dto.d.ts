import { User } from '.prisma/client';
export declare class UserDto {
    user: Pick<User, 'email' | 'password'>;
}
