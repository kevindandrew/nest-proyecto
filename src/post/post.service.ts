import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundError } from 'rxjs';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    const autor = await this.prisma.user.findUnique({
      where: { id: data.authorId },
    });
    if (!autor) {
      throw new NotFoundException('el autor no existe');
    }
    return this.prisma.post.create({
      data,
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          omit: {
            password: true,
            activo: true,
            id: true,
            createdAt: true,
          },
        },
      },
    });
  }

  update(id: number, data: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
