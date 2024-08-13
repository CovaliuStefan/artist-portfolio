import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.userService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.userService.login(body.username, body.password);
  }
}
