import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CalendarFilterInput {
  @Field(() => [String])
  readonly month: string[]
}
