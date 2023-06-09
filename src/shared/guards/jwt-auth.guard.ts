import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context)
    const request = gqlContext.getContext().req
    const authorizationHeader = request.headers.authorization

    if (authorizationHeader) {
      const [bearer, token] = authorizationHeader.split(' ')

      if (bearer === 'Bearer' && token) {
        try {
          const decoded = this.jwtService.verify(token)
          request.user = decoded
          return true
        } catch (e) {
          throw new UnauthorizedException('Invalid token')
        }
      }
    }

    // if (token) {
    //   try {
    //     const decoded = this.jwtService.verify(token) // 토큰 유효성 검사
    //     request.user = decoded // 유효한 토큰의 내용을 요청 객체에 저장
    //     return true
    //   } catch (e) {
    //     throw new UnauthorizedException('Invalid token')
    //   }
    // }

    throw new UnauthorizedException('Token not provided')
  }
}
