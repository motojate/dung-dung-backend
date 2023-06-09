import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginMemberUserInput } from 'src/member/user/dto/user.input'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async loginMemberUser(@Args('loginMemberUserInput') loginMemberUserInput: LoginMemberUserInput): Promise<string> {
    const user = await this.authService.validateUser(loginMemberUserInput)
    const token: string = await this.authService.createToken(user)
    console.log(token)
    return token
  }
}
