import { Resolver, Query, Args } from '@nestjs/graphql'
import { MarketService } from './market.service'
import { MarketFilterInput } from './dto/market-filter.input'
import { Market } from './model/market.model'

@Resolver()
export class MarketResolver {
  constructor(private readonly marketService: MarketService) {}

  @Query(() => [Market])
  async getMarkets(@Args('marketFilterInput') marketFilterInput: MarketFilterInput) {
    return this.marketService.findByArea(marketFilterInput)
  }
}
