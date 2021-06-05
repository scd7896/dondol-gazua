import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async signUp(@Body() { user }: UserDto, @Res() res: Response) {
    try {
      const result = await this.userService.createUser(user);
      if (result) {
        const token = await this.authService.login(result);
        res.status(HttpStatus.CREATED).json(token);
      } else {
        res
          .status(HttpStatus.CONFLICT)
          .json({ message: '이미 가입된 유저입니다.' });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.json(err);
    }
    return null;
  }
}
