import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    signUp({ user }: UserDto, res: Response): Promise<any>;
}
