import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { User } from './model/user.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import * as bcrypt from 'bcrypt'
import { DeleteMemberUserInput, FindMemberUserByUserId, SignUpMemberUserInput, UpdateMemberUserInput } from './dto/user.input'
import { CrudService } from 'src/shared/interfaces/factory.interface'
@Injectable()
export class UserService implements CrudService<User> {
  constructor(private readonly prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        include: {
          schedules: {
            include: {
              calendar: true
            }
          }
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async findUnique(dto: FindMemberUserByUserId): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          userId: dto.userId
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async create(dto: SignUpMemberUserInput): Promise<boolean> {
    try {
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)
      const hasshedPassword = await bcrypt.hash(dto.password, salt)

      await this.prisma.user.create({
        data: {
          userId: dto.userId,
          password: hasshedPassword,
          birthday: new Date()
        }
      })

      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  // TODO : 비밀번호 생략
  async update(dto: UpdateMemberUserInput): Promise<boolean> {
    try {
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)
      const hasshedPassword = await bcrypt.hash(dto.password, salt)

      await this.prisma.user.update({
        where: {
          userId: dto.userId
        },
        data: {
          password: hasshedPassword
        }
      })

      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async delete(dto: DeleteMemberUserInput): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: {
          userId: dto.userId
        }
      })
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  findByFilter(dto: Partial<User>): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
}
