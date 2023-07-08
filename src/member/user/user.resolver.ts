import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './model/user.model'
import { SignUpMemberUserInput } from './dto/user.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async findAllMemberUser(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Mutation(() => Boolean)
  async signUpMemberUser(@Args('signUpMemberUserInput') signUpMemberUserInput: SignUpMemberUserInput): Promise<boolean> {
    return await this.userService.create(signUpMemberUserInput)
  }
}
