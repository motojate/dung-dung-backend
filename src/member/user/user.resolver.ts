import { Resolver, Query, Mutation } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './model/user.model'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async findAllMemberUser(): Promise<User[]> {
    return await this.userService.findAllMemberUser()
  }

  @Mutation(() => String)
  async signUpMemberUser(): Promise<string> {
    return await this.userService.signUpMemberUser()
  }
}
