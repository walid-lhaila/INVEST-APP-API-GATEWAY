import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('Auth')
export class AuthController {
  constructor(
    @Inject('Auth-Service') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  createUser(@Body() userDto: any) {
    return this.authService.send({ cmd: 'register' }, userDto);
  }

  @Post('login')
  login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }
}
