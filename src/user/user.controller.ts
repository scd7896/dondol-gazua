import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get() testFun() {
    console.log('assss');
    return 'testtes2t';
  }

  @Post()
  async signUp(@Body() { user }: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.userService.createUser(user);
      console.log(result);
      if (result) {
        const token = await this.authService.login(result);
        res.status(HttpStatus.CREATED).json(token);
      } else {
        res
          .status(HttpStatus.CONFLICT)
          .json({ message: '이미 가입된 유저입니다.' });
      }
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.json(err);
    }
    return null;
  }
}
