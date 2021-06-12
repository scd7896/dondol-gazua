import { UserService } from 'src/user/user.service';
import { User } from '.prisma/client';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: Pick<User, 'email' | 'password'>): Promise<any>;
    check(token: string): Promise<{
        accessToken: string;
    }>;
}
