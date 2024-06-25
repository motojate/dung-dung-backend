import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { OptionModule } from './option/option.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [OptionModule]
})
export class QuestionModule {}
