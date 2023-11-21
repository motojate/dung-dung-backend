import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { MarketFilterInput } from './dto/market-filter.input'

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}
  async findByArea(dto: MarketFilterInput) {
    const whereCondition = dto.location
      ? {
          AND: [
            {
              address: { contains: dto.area.toString() }
            },
            {
              address: { contains: dto.location.toString() }
            }
          ]
        }
      : {
          address: { contains: dto.area.toString() }
        }

    try {
      return this.prisma.market.findMany({
        where: {
          ...whereCondition
        }
      })
    } catch (e) {}
  }
  async create() {
    try {
    } catch (e) {}
  }
}
