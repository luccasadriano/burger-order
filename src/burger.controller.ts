import { Controller, Logger, UseFilters } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { BurgerService } from './burger.service'
import { HttpExceptionFilter } from './exceptionFilter/htttpException.filter'
import { Iburger, IburgerInput } from './types/burger.interface'

@Controller()
export class BurgerController {
  constructor(private readonly burgerService: BurgerService) {}

  private readonly logger = new Logger(BurgerController.name)

  @MessagePattern('find-all-burger')
  @UseFilters(HttpExceptionFilter)
  async index(): Promise<Iburger[]> {
    return await this.burgerService.findAll()
  }

  @MessagePattern('find-burger')
  @UseFilters(HttpExceptionFilter)
  async find(@Payload() id: number): Promise<Iburger> {
    return await this.burgerService.find(id)
  }

  @MessagePattern('mount-burger')
  @UseFilters(HttpExceptionFilter)
  async rankingBurguer(@Payload() data: IburgerInput): Promise<Iburger> {
    return await this.burgerService.mountBurger(data)
  }

  @EventPattern('update-burger')
  @UseFilters(HttpExceptionFilter)
  async updateBurger(@Payload() data: IburgerInput): Promise<void> {
    return await this.burgerService.updateBurger(data)
  }

  @EventPattern('delete-burger')
  @UseFilters(HttpExceptionFilter)
  async remove(@Payload() id: number): Promise<void> {
    return await this.burgerService.remove(id)
  }

  @EventPattern('activate-burger')
  @UseFilters(HttpExceptionFilter)
  async activate(@Payload() data: any): Promise<void> {
    return await this.burgerService.activate(data)
  }

  @EventPattern('inactivate-burger')
  @UseFilters(HttpExceptionFilter)
  async inactivate(@Payload() data: any): Promise<void> {
    return await this.burgerService.inactivate(data)
  }
}
