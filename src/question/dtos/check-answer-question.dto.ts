import { IsString, Length } from 'class-validator';

export class CheckAnswerQuestionDto {
  @IsString()
  @Length(1, 1, { message: '1글자만 입력이 가능합니다.' })
  readonly answer: string;
}
