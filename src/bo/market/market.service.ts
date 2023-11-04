import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { MarketFilterInput } from './dto/market-filter.input'

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}
  async findByArea(dto: MarketFilterInput) {
    try {
      return this.prisma.market.findMany({
        where: {
          AND: [
            {
              address: { contains: dto.area.toString() }
            },
            {
              address: { contains: dto.location.toString() }
            }
          ]
        }
      })
    } catch (e) {}
  }
}
