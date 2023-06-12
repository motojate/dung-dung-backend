import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Grade } from '@prisma/client'

@ObjectType()
export class Character {
  @Field(() => Int)
  readonly id: number

  @Field(() => String)
  readonly name: string

  @Field(() => String)
  readonly season: string

  @Field(() => Grade)
  readonly grade: Grade
}
