import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [PrismaModule, TodoModule, QuestionModule],
  providers: []
})
export class AppModule {}
