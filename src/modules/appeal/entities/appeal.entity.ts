import { Type } from 'src/modules/appeal/datasets'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appeal')
export class AppealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'timestamp' })
  finishedAt: Date

  @Column({ type: 'enum', enum: Type })
  type: string

  @Column({ unique: true })
  ipn: string

  @Column()
  age: number
}
