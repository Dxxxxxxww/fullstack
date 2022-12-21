import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // 该模块中需要被实例化的 controller
  controllers: [UserController],
  // providers 提供的服务会在该模块中共享，也就是说可以在 controller 中调用
  providers: [UserService, PrismaService],
})
export class UserModule {}
