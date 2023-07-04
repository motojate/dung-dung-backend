import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class AppService {
  abstract create(): void
  abstract update(): void
  abstract findAll(): any[]
  abstract findUnique(): any
  abstract delete(): void
}
