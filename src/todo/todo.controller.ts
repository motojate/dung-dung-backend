import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Res() res) {
    const userSeq = 'adb2ef0c-5468-41d1-9128-032c62a0358a'; // TODO: 토큰 검사 필요함

    await this.todoService.createTodo(userSeq, createTodoDto);
    res.send();
  }
}
