import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BurgerEntity } from './entity/burger.entity'
// import { ProducerService } from './kafka/producer.service'
import { Iburger, IburgerInput } from './types/burger.interface'

@Injectable()
export class BurgerService {
  constructor(
    @InjectRepository(BurgerEntity)
    private burgerRepository: Repository<BurgerEntity>, // private readonly producerService: ProducerService,
  ) {}

  async findAll(): Promise<BurgerEntity[]> {
    // await this.producerService.produce({
    //   topic: 'test',
    //   messages: [
    //     {
    //       value: 'Hello World!',
    //     },
    //   ],
    // })
    return await this.burgerRepository.find()
  }

  async find(id: number): Promise<Iburger> {
    const response = await this.burgerRepository.findOne({
      where: {
        id: id,
      },
    })

    return { ...response }
  }

  async mountBurger(input: IburgerInput): Promise<BurgerEntity> {
    // const { breads, burgers, ingredients, additional } = input
    // console.log(breads, burgers, ingredients, additional)

    // await this.producerService.produce({
    //   topic: 'mountBurger',
    //   messages: [
    //     { value: breads },
    //     { value: burgers },
    //     { value: ingredients },
    //     { value: additional },
    //   ],
    // })

    const response = await this.burgerRepository.save(input)

    // console.log('mount burger --->', response)
    // const strig =
    //   'Qual será o ranking do seu burger? Só aguardar que receberar no seu email o seu ranking'

    return response
  }
}
