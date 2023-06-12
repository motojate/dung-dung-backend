import { Injectable } from '@nestjs/common'
import { CumulativeDistributionTree } from './dto/weighted-random'
import { Character } from 'src/member/character/dto/model/character.model'
import { PrismaService } from 'src/prisma/prisma.service'
import { Grade } from '@prisma/client'

@Injectable()
export class WeightedRandomService {
  constructor(private readonly prisma: PrismaService) {}

  chooseRandomGrade(): Grade {
    const weightedItems = [
      { item: Grade.SSR, weight: 0.1 },
      { item: Grade.S, weight: 1 },
      { item: Grade.A, weight: 8.9 },
      { item: Grade.B, weight: 40 },
      { item: Grade.C, weight: 50 }
    ]

    const weightedRandom = new CumulativeDistributionTree(weightedItems)

    const selected: Grade = weightedRandom.selectItem()

    return selected
  }

  async selectCharacter(): Promise<Character> {
    try {
      const grade: Grade = this.chooseRandomGrade()
      const characters = await this.prisma.character.findMany({
        where: {
          grade: grade
        },
        include: {
          users: true
        }
      })
      const randomIndex = Math.floor(Math.random() * characters.length)
      const selectedCharacter = characters[randomIndex]
      return selectedCharacter
    } catch (e) {
      console.error(e)
    }
  }
}
