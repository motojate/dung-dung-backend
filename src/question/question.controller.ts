import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('category')
  async getQuestionCategories() {
    const categories = this.questionService.getQuestionCategories();
    return categories;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    await this.questionService.createQuestion(createQuestionDto);
    return 1;
  }
}
