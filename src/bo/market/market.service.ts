import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { AreaType } from './dto/market-filter.input'

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}
  async findByArea(dto: AreaType) {
    try {
      return this.prisma.market.findMany({
        where: {
          address: { contains: dto.toString() }
        }
      })
    } catch (e) {}
  }
}
