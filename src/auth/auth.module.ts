import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from 'src/member/user/user.module'
import { AuthResolver } from './auth.resolver'

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
      })
    })
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtModule, JwtStrategy]
})
export class AuthModule {}
