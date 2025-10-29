import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './news-category.entity'
import { NewsTranslationEntity } from './news-translation.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsCategoryEntity, (category) => category.news, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category?: NewsCategoryEntity

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date

  @Column({ default: false })
  isPublished: boolean

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news, { cascade: true, eager: true })
  translations: NewsTranslationEntity[]
}
