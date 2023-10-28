import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppService } from './app.service'
import { UserModule } from './member/user/user.module'
import { CalenderModule } from './member/calender/calender.module'
import { join } from 'path'
import { ScheduleModule } from './member/schedule/schedule.module'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { createLogger } from 'winston'
import { AuthModule } from './shared/auth/auth.module'
import * as winstonDaily from 'winston-daily-rotate-file'
import { ConfigModule } from '@nestjs/config'
import { WeightedRandomModule } from './weighted-random/weighted-random.module'
import { CharacterModule } from './member/character/character.module'
import { CodeModule } from './bo/code/code.module'
import { MarketModule } from './bo/market/market.module'
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    WinstonModule.forRoot({
      levels: {
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        trace: 5,
        access: 6
      },
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss:ms'
        }),
        winston.format.label({ label: process.env.NODE_ENV === 'production' ? 'http' : 'debug' }),
        winston.format.printf((info) => {
          return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack ? info.stack : ''} `
        })
      ),
      transports: (() => {
        const env = process.env.NODE_ENV
        // local -> console log
        // dev, prod -> file log
        if (env == 'local' || !env) {
          return [new winston.transports.Console({ level: 'error' })]
        }
        return [
          new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: (() => {
              const env = process.env.NODE_ENV
              if (env == 'local' || !env) {
                return '/Users/maxi/Desktop/logger'
              } else {
                return '/Users/maxi/Desktop/logger'
              }
            })(),
            filename: `%DATE%.log`,
            maxFiles: 30, //30일치 로그파일 저장
            zippedArchive: true,
            handleExceptions: true
          }),
          createLogger({
            levels: {
              access: 0,
              error: 1,
              warning: 2,
              info: 3,
              debug: 4,
              trace: 5
            },
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss:ms'
              }),
              winston.format.label({ label: process.env.NODE_ENV === 'production' ? 'http' : 'debug' }),
              winston.format.printf((info) => {
                return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${info.stack ? info.stack : ''} `
              })
            ),
            transports: [
              new winstonDaily({
                level: 'access',
                datePattern: 'YYYY-MM-DD',
                dirname: (() => {
                  const env = process.env.NODE_ENV
                  if (env == 'local' || !env) {
                    return '/Users/maxi/Desktop/logger'
                  } else {
                    return '/Users/maxi/Desktop/logger'
                  }
                })(),
                filename: `%DATE%.access.log`,
                maxFiles: 30, //30일치 로그파일 저장
                zippedArchive: true,
                handleExceptions: true
              })
            ]
          })
        ]
      })()
    }),
    UserModule,
    CalenderModule,
    ScheduleModule,
    AuthModule,
    ConfigModule.forRoot(),
    WeightedRandomModule,
    CharacterModule,
    CodeModule,
    MarketModule
  ],
  providers: [AppService]
})
export class AppModule {}
