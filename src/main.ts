import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = 3100
  await app.listen(port).then(() => {
    console.log(`Service listening : ${port}`)
  })
}
bootstrap()
