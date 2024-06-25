import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @Length(1, 1, { message: '1글자만 입력이 가능합니다.' })
  readonly label: string;

  @IsString()
  @IsNotEmpty({ message: '보기는 필수 값입니다.' })
  readonly text: string;
}
