import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BurgerController } from './burger.controller'
import { BurgerService } from './burger.service'
import { DatabaseModule } from './database/database.module'
import { BurgerEntity } from './entity/burger.entity'
import { KafkaModule } from './kafka/kafka.module'
import { TestConsumer } from './test.consumer'

@Module({
  imports: [
    KafkaModule,
    TypeOrmModule.forFeature([BurgerEntity]),
    DatabaseModule,
  ],
  controllers: [BurgerController],
  providers: [BurgerService, TestConsumer],
})
export class BurgerModule {}
