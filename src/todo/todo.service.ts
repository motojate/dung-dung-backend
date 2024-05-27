import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTodoDto } from 'src/todo/dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async createTodo(userSeq: string, dto: CreateTodoDto) {
    const now = new Date();
    await this.prisma.todo.create({
      data: {
        ...dto,
        startTime: now,
        user: {
          connect: {
            userSeq
          }
        }
      }
    });
  }
}
