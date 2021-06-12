import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '.prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user)
      return {
        status: 'error',
        message: '그 이메일은 없는 이메일입니다.',
      };
    if (user && bcrypt.compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return {
      status: 'error',
      message: '비밀번호를 잘못 입력하셨습니다.',
    };
  }

  async login(user: Pick<User, 'email' | 'password'>) {
    const result = await this.validateUser(user.email, user.password);

    if (result.status === 'error') return result;
    const payload = { email: result.email, id: result.id };

    return {
      accessToken: sign(payload, jwtConstants.secret, { expiresIn: '48h' }),
    };
  }

  async check(token: string) {
    const result = verify(token, jwtConstants.secret) as {
      email: string;
      id: number;
    };
    const payload = { email: result.email, id: result.id };

    return {
      accessToken: sign(payload, jwtConstants.secret, { expiresIn: '48h' }),
    };
  }
}
