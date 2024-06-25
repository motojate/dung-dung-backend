import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateQuestionDto } from './dtos/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(dto: CreateQuestionDto) {
    const { options, ...questionDto } = dto;
    await this.prisma.question.create({
      data: {
        ...questionDto,
        options: {
          create: options
        }
      }
    });
  }
}