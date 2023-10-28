import { Module } from '@nestjs/common'
import { MarketService } from './market.service'
import { MarketResolver } from './market.resolver'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Module({
  providers: [MarketService, MarketResolver, PrismaService]
})
export class MarketModule {}
