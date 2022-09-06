import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BurgerEntity } from './entity/burger.entity'
import { ProducerService } from './kafka/producer.service'
import { Iburger, IburgerInput, IMountburger } from './types/burger.interface'

@Injectable()
export class BurgerService {
  constructor(
    @InjectRepository(BurgerEntity)
    private burgerRepository: Repository<BurgerEntity>,
    private readonly producer: ProducerService,
  ) {}

  async findAll(): Promise<BurgerEntity[]> {
    return await this.burgerRepository.find({
      where: {
        status: 'ACTIVATE',
      },
    })
  }

  async find(id: number): Promise<Iburger> {
    const response = await this.burgerRepository.findOne({
      where: {
        id: id,
      },
    })

    return { ...response }
  }

  async mountBurger(input: IMountburger): Promise<BurgerEntity> {
    const { additionals, breads, burgers, ingredients, contacts } = input
    const burger = {
      additionals,
      breads,
      burgers,
      ingredients,
    }

    const response = await this.burgerRepository.save(burger)

    const { id } = response

    const contact = { id, ...contacts }

    await this.producer.produce({
      topic: 'notification-email',
      messages: [
        {
          value: JSON.stringify(contact),
        },
      ],
    })

    return response
  }

  async updateBurger({
    id,
    additionals,
    breads,
    burgers,
    ingredients,
  }: Iburger): Promise<void> {
    const burger = await this.find(id)

    burger.breads = breads ? breads : burger.breads
    burger.burgers = burgers ? burgers : burger.burgers
    burger.ingredients = ingredients ? ingredients : burger.ingredients
    burger.additionals = additionals ? additionals : burger.additionals

    await this.burgerRepository.save(burger)
  }

  async remove(id: number): Promise<void> {
    await this.burgerRepository.delete(id)
  }

  async activate(id: number): Promise<void> {
    await this.burgerRepository.update(id, { status: 'ACTIVATE' })
  }

  async inactivate(id: number): Promise<void> {
    await this.burgerRepository.update(id, { status: 'INACTIVATE' })
  }
}
