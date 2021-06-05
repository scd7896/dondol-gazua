import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '.prisma/client';
import { sign } from 'jsonwebtoken';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Pick<User, 'email' | 'password'>) {
    const result = await this.validateUser(user.email, user.password);

    if (!result) return null;
    const payload = { email: result.email, id: result.id };

    return {
      accessToken: sign(payload, jwtConstants.secret, { expiresIn: '24h' }),
    };
  }
}
