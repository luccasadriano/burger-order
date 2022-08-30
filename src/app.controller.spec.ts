import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { KafkaModule } from './kafka/kafka.module'
import { ProducerService } from './kafka/producer.service'
import { TestConsumer } from './test.consumer'

describe('AppController', () => {
  let appController: AppController

  const producerService = {
    produce: jest.fn().mockResolvedValue(
      Promise.resolve({
        topic: 'test',
        messages: [
          {
            value: 'Hello World!',
          },
        ],
      }),
    ),
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule],
      controllers: [AppController],
      providers: [AppService, TestConsumer],
    })
      .overrideProvider(ProducerService)
      .useValue(producerService)
      .compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!')
    })
  })
})
