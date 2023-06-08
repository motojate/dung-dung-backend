import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from './model/user.model'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
