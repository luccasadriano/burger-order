import { Controller, Logger, UseFilters } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { ApiBody } from '@nestjs/swagger'
import { BurgerService } from './burger.service'
import { BurgerDto } from './dtos/burger.dto'
import { BurgerEntity } from './entity/burger.entity'
import { HttpExceptionFilter } from './exceptionFilter/htttpException.filter'
import { Iburger } from './types/burger.interface'

@Controller()
export class BurgerController {
  constructor(private readonly burgerService: BurgerService) {}

  private readonly logger = new Logger(BurgerController.name)

  @MessagePattern('find-all-burger')
  @UseFilters(HttpExceptionFilter)
  async index(): Promise<BurgerEntity[]> {
    return await this.burgerService.findAll()
  }

  @MessagePattern('find-burger')
  @UseFilters(HttpExceptionFilter)
  async find(@Payload() data: number): Promise<Iburger> {
    console.log(data)

    return await this.burgerService.find(data)
  }

  @MessagePattern('mount-burger')
  @ApiBody({ type: BurgerDto })
  @UseFilters(HttpExceptionFilter)
  async rankingBurguer(@Payload() data: BurgerDto): Promise<BurgerEntity> {
    console.log(data)

    return await this.burgerService.mountBurger(data)
  }
}
