import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from './auth.service'
import { User } from 'src/member/user/model/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any): Promise<User> {
    const user = await this.authService.validateUser(payload.sub)
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
    return user
  }
}
