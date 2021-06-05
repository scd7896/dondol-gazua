import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { user }: UserDto, @Res() res: Response) {
    try {
      const token = await this.authService.login(user);
      if (!token) throw '유저가 잘못 되었습니다.';
      res.json(token);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json({ message: err });
    }
    return null;
  }
}
