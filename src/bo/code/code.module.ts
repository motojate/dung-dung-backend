import { Module } from '@nestjs/common'
import { CodeService } from './code.service'
import { CodeResolver } from './code.resolver'

@Module({
  providers: [CodeService, CodeResolver]
})
export class CodeModule {}
