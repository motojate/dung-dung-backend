import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as dayjs from 'dayjs'
import jwtDecode from 'jwt-decode'

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx)
  const { user, headers } = gqlContext.getContext().req
  const authorization = headers?.authorization

  if (user && authorization && !authorization.includes('Basic') && !authorization.includes('null')) {
    const decodedToken: any = jwtDecode(authorization.replace('Bearer ', ''))
    const { iat, exp } = decodedToken
    const tokenExpiresIn = dayjs(exp * 1000).diff(iat * 1000, 'day')
    const newIssuedAt = dayjs().unix()
    const newExpireAt = dayjs().add(tokenExpiresIn, 'day').unix()
    return { ...user, newIssuedAt, newExpireAt }
  }
  return user
})

export const Request = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx)
  return gqlContext.getContext().req
})
