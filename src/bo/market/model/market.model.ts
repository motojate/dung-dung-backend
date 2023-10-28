import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Market {
  @Field(() => Int)
  readonly id: number

  @Field(() => String)
  readonly name: string

  @Field(() => String)
  readonly type: string

  @Field(() => String)
  readonly nameAddress: string

  @Field(() => String)
  readonly address: string
}
