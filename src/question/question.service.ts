import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CheckAnswerQuestionDto } from './dtos/check-answer-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async getQuestions(categoryCode: string) {
    return this.prisma.question.findMany({
      where: {
        categoryCode
      },
      select: {
        id: true,
        text: true,
        options: {
          select: {
            text: true,
            label: true
          }
        }
      }
    });
  }

  async getQuestionCategories() {
    return this.prisma.questionCategory.findMany({
      select: {
        code: true,
        name: true
      }
    });
  }

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

  async checkAnswerQuestion(dto: CheckAnswerQuestionDto & { questionId: number }) {
    const { answer: userAnswer, questionId } = dto;
    const { answer: questionAnswer } = await this.prisma.question.findUnique({ where: { id: questionId }, select: { answer: true } });
    return userAnswer === questionAnswer;
  }
}
