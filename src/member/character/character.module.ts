import { Module } from '@nestjs/common'
import { registerEnumType } from '@nestjs/graphql'
import { Grade } from '@prisma/client'

@Module({})
export class CharacterModule {
  constructor() {
    registerEnumType(Grade, {
      name: 'Grade' // GraphQL 스키마에서 사용될 Enum 이름
    })
  }
}
