import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class LoginMemberUserInput {
  @Field(() => String, { nullable: false })
  readonly userId: string

  @Field(() => String, { nullable: false })
  readonly password: string
}

@InputType()
export class FindMemberUserByUserId {
  @Field(() => String, { nullable: false })
  readonly userId: string
}

@InputType()
export class SignUpMemberUserInput {
  @Field(() => String, { nullable: false })
  readonly userId: string

  @Field(() => String, { nullable: false })
  readonly password: string
}

@InputType()
export class UpdateMemberUserInput {
  @Field(() => String, { nullable: false })
  readonly userId: string

  @Field(() => String, { nullable: true })
  readonly password?: string
}

@InputType()
export class DeleteMemberUserInput {
  @Field(() => String, { nullable: false })
  readonly userId: string
}
