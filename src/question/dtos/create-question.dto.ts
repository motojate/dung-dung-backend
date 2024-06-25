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

  @ValidateNested({ each: true }) // 각 배열 요소에 대해 ValidateNested 적용
  @ArrayMinSize(1, { message: '적어도 하나의 옵션은 제공되어야 합니다.' }) // 옵션 배열이 최소 한 개 이상 있어야 함
  @Type(() => CreateOptionDto) // 배열의 요소들이 CreateOptionDto 타입으로 변환되어야 함
  readonly options: CreateOptionDto[];
}
