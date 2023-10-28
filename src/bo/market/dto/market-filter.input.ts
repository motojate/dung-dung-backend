import { Field, InputType, registerEnumType } from '@nestjs/graphql'

export enum AreaType {
  SEOUL = '서울',
  GYEONGGI = '경기',
  INCHEON = '인천'
}
registerEnumType(AreaType, {
  name: 'AreaType'
})

@InputType()
export class MarketFilterInput {
  @Field(() => AreaType)
  readonly area: AreaType
}
