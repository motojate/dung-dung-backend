import { ArrayMinSize, IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';
import { CreateOptionDto } from '../option/dtos/create-option.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: '문제 정보는 필수 값입니다.' })
  readonly text: string;

  @IsString()
  @Length(1, 1, { message: '1글자만 입력이 가능합니다.' })
  readonly answer: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리 정보는 필수 값입니다.' })
  readonly categoryCode: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: '적어도 하나의 옵션은 제공되어야 합니다.' })
  @Type(() => CreateOptionDto)
  readonly options: CreateOptionDto[];
}
