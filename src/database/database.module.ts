import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BurgerEntity } from '../entity/burger.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'BURGER',
      database: 'burgers',
      entities: [BurgerEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
