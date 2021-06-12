import { Response } from 'express';
import { UserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ user }: UserDto, res: Response): Promise<any>;
    check({ token }: {
        token: string;
    }, res: Response): Promise<void>;
}
