import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserList() {
    return this.prisma.user.findMany();
  }

  async signUp(signUpDto: SignUpDto) {
    const exitUser = await this.getUserByMobile(signUpDto.mobile);
    if (exitUser) {
      throw new Error('User already exists');
    }
    const { mobile, password, name } = signUpDto;
    const hash = await this.getPasswordHash(password);
    const user = await this.prisma.user.create({
      data: {
        mobile,
        name,
        password: hash,
        // 暂时先默认值
        address: 'abc',
      },
    });
    return user.id;
  }

  getPasswordHash(password: string) {
    return hash(password, 10);
  }

  comparePassword(password: string, user: User) {
    return compare(password, user.password);
  }

  getUserByMobile(mobile: string) {
    if (!mobile) return false;
    return this.prisma.user.findUnique({ where: { mobile } });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
