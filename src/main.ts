import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Partitioners } from 'kafkajs'
import { BurgerModule } from './burger.module'

const logger = new Logger('Burger Ranking')

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BurgerModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'burger',
          brokers: [':9092'],
        },
        consumer: {
          groupId: 'burger-consumer',
          allowAutoTopicCreation: true,
        },
        producer: {
          createPartitioner: Partitioners.DefaultPartitioner,
        },
      },
    },
  )

  await app
    .listen()
    .then(() => {
      logger.log('burger-ranking is running')
    })
    .catch((err) => logger.log('err', err))
}
bootstrap()
