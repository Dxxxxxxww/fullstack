import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  getUserList() {
    return this.userService.getUserList();
  }

  @Post('/signUp')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }
}
