import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppService } from './app.service'
import { UserModule } from './member/user/user.module'
import { CalenderModule } from './member/calender/calender.module'
import { join } from 'path'
import { ScheduleModule } from './member/schedule/schedule.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    UserModule,
    CalenderModule,
    ScheduleModule
  ],
  providers: [AppService]
})
export class AppModule {}
