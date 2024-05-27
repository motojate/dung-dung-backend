import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PrismaModule, TodoModule],
  providers: []
})
export class AppModule {}
