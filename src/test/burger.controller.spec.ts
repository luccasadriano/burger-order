import { Test, TestingModule } from '@nestjs/testing'
import { BurgerController } from '../burger.controller'
import { BurgerService } from '../burger.service'
import { KafkaModule } from '../kafka/kafka.module'
import { ProducerService } from '../kafka/producer.service'
import { TestConsumer } from '../test.consumer'

describe('AppController', () => {
  let burgerController: BurgerController

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
      controllers: [BurgerController],
      providers: [BurgerService, TestConsumer],
    })
      .overrideProvider(ProducerService)
      .useValue(producerService)
      .compile()

    burgerController = app.get<BurgerController>(BurgerController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await burgerController.getHello()).toBe('Hello World!')
    })
  })
})
