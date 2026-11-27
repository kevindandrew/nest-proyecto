import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: passwordHash },
      select: { id: true, email: true, role: true, name: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      where: { activo: true },
      omit: { password: true, activo: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('el usuario con este id no existe');
    }
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
