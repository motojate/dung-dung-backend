import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class LoginMemberUserInput {
  @Field(() => String, { nullable: false })
  readonly userId: string

  @Field(() => String, { nullable: false })
  readonly password: string
}
