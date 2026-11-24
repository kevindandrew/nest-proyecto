import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: { email: string; name: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      where: { activo: true },
      omit: { password: true, activo: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true, activo: true },
    });
  }

  update(
    id: number,
    data: {
      email?: string;
      name?: string;
      password?: string;
      activo?: boolean;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { activo: false },
      omit: { password: true },
    });
  }

  deleteGozu(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
