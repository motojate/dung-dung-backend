import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from './model/user.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

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

  async signUpMemberUser(): Promise<string> {
    try {
      const salt = await bcrypt.genSalt()
      console.log(salt)
      const hasshedPassword1 = await bcrypt.hash('qwer1234!!', 10)
      const hasshedPassword2 = await bcrypt.hash('1', 10)
      const hasshedPassword3 = await bcrypt.hash('1', 10)
      console.log(hasshedPassword1)
      console.log(bcrypt.compareSync('1', hasshedPassword1))
      console.log(bcrypt.compareSync('1', hasshedPassword2))
      console.log(bcrypt.compareSync('1', hasshedPassword3))

      return '2'
    } catch (e) {
      this.logger.error(e)
    }
  }
}
