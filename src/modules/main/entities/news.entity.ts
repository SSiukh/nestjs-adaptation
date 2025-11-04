import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './news-category.entity'
import { NewsTranslationEntity } from './news-translation.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  slug: string

  @ManyToOne(() => NewsCategoryEntity, (category) => category.news, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  newsCategory?: NewsCategoryEntity

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date

  @Column({ nullable: true })
  publishedHour: number

  @Column({ nullable: true })
  publishedMinute: number

  @Column({ nullable: true })
  publishedSecond: number

  @Column({ default: false })
  isPublished: boolean

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news, { cascade: true, eager: true })
  translationList: NewsTranslationEntity[]
}
