import { Query, Resolver } from '@nestjs/graphql'
import { WeightedRandomService } from './weighted-random.service'
import { Character } from 'src/member/character/dto/model/character.model'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Resolver()
export class WeightedRandomResolver {
  constructor(private readonly weightedRandomService: WeightedRandomService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Character)
  async selectCharacter(): Promise<Character> {
    return this.weightedRandomService.selectCharacter()
  }
}
