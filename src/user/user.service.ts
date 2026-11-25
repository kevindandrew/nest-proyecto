import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundException } from '@nestjs/common';
import { Update } from 'vite';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      throw new BadRequestException('Este correo ya existe en otro usuario');
    }
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

  update(id: number, data: UpdateUserDto) {
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
