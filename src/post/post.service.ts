import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundError } from 'rxjs';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePostDto, authorId: number) {
    return this.prisma.post.create({
      data: { ...data, authorId },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
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
    if (!post) {
      throw new NotFoundException('el post con este id no existe');
    }
    return post;
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
