import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BurgerEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  breads: string

  @Column()
  burgers: string

  @Column()
  ingredients: string

  @Column({ nullable: true })
  additionals: string
}
