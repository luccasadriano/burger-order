import { Injectable } from '@nestjs/common'
import { ProducerService } from './kafka/producer.service'
import { IburgerInput } from './types/burger.interface'

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello(): Promise<string> {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'Hello World!',
        },
      ],
    })
    return 'Hello World!'
  }

  rankingBurguer(input: IburgerInput): string {
    const { breads, burgers, ingredients, additional } = input
    console.log(breads, burgers, ingredients, additional)

    return 'Qual será o ranking do seu burger'
  }
}
