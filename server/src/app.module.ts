import { Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
// import { UserService } from './user/user.service';
import { UserService } from './user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
