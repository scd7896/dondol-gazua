import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { user }: UserDto) {
    return this.authService.login(user);
  }
}
