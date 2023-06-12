import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './model/user.model'
import { SignUpMemberUserInput } from './dto/user.input'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async findAllMemberUser(): Promise<User[]> {
    return await this.userService.findAllMemberUser()
  }

  @Mutation(() => String)
  async signUpMemberUser(@Args('signUpMemberUserInput') signUpMemberUserInput: SignUpMemberUserInput): Promise<string> {
    return await this.userService.signUpMemberUser(signUpMemberUserInput)
  }
}
