import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TodoModule } from './todo/todo.module';
import { QuestionModule } from './question/question.module';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [PrismaModule, TodoModule, QuestionModule, JobApplicationModule],
  providers: []
})
export class AppModule {}
