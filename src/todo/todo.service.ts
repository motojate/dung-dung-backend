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

  async getTodayTodo(userSeq: string) {
    const now = new Date();
    return this.prisma.todo.findMany({
      where: {
        userSeq: userSeq,
        startTime: {
          lte: now
        }
      }
    });
  }

  async deleteTodo(id: number) {
    await this.prisma.todo.delete({
      where: {
        id
      }
    });
  }

  async updateTodo() {
    //TODO
  }
}
