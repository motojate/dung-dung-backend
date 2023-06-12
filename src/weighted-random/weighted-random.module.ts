import { Module } from '@nestjs/common'
import { WeightedRandomResolver } from './weighted-random.resolver'
import { WeightedRandomService } from './weighted-random.service'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [WeightedRandomResolver, WeightedRandomService],
  imports: [PrismaModule]
})
export class WeightedRandomModule {}
