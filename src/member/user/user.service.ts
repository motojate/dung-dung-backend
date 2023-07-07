import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { User } from './model/user.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import * as bcrypt from 'bcrypt'
import { SignUpMemberUserInput } from './dto/user.input'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async findAllMemberUser(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        schedules: {
          include: {
            calendar: true
          }
        }
      }
    })
  }

  async findByUserIdMemberUser(userId: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          userId
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async signUpMemberUser(signUpMemberUserInput: SignUpMemberUserInput): Promise<string> {
    try {
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)
      const hasshedPassword = await bcrypt.hash(signUpMemberUserInput.password, salt)

      const user = await this.prisma.user.create({
        data: {
          userId: signUpMemberUserInput.userId,
          password: hasshedPassword
        }
      })

      return user.userId
    } catch (e) {
      this.logger.error(e)
    }
  }
}
