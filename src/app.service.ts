import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class AppService<T> {
  abstract create(): void
  abstract update(): void
  abstract findAll(): T[]
  abstract findUnique(): T
  abstract delete(): void
}
