import {
  Equals,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';

export class SignUpDto {
  // @IsMobilePhone(['zh-CN', 'en-US'])
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  // @Equals('password') 有问题，一直报校验失败
  @Match('password', { message: 'rePassword must be equal to password' })
  rePassword: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

// class MyClass {
//   @IsMobilePhone(['fi-FI', 'nn-NO'])
//   phone: string;
// }
