import { OmitType, ObjectType, Int, Field } from '@nestjs/graphql'
import { User } from 'src/member/user/model/user.model'

@ObjectType()
export class AuthUserInput extends OmitType(User, ['password', 'schedules']) {
  @Field(() => Int, { nullable: true })
  readonly newIssuedAt?: number

  @Field(() => Int, { nullable: true })
  readonly newExpireAt?: number
}
