import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionService } from './question.service';
import { CheckAnswerQuestionDto } from './dtos/check-answer-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions(@Query('categoryCode') categoryCode: string) {
    const questions = await this.questionService.getQuestions(categoryCode);
    return questions;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    await this.questionService.createQuestion(createQuestionDto);
    return 1;
  }

  @Get('category')
  async getQuestionCategories() {
    const categories = this.questionService.getQuestionCategories();
    return categories;
  }

  @Post(':questionId/answer')
  async checkQuestionAnswer(@Param('questionId') questionId: number, @Body() checkAnswerQuestionDto: CheckAnswerQuestionDto) {
    const dto = { ...checkAnswerQuestionDto, questionId };
    const result = await this.questionService.checkAnswerQuestion(dto);
    return result;
  }
}
