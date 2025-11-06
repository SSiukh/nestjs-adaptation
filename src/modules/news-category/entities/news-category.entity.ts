import { NewsEntity } from 'src/modules/news/entities'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryTranslationEntity } from './news-category-translation.entity'

@Entity('news_category')
export class NewsCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  isPublished: boolean

  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date

  @OneToMany(() => NewsEntity, (news) => news.newsCategory)
  news?: NewsEntity[]

  @OneToMany(() => NewsCategoryTranslationEntity, (translation) => translation.category, { cascade: true, eager: true })
  translationList: NewsCategoryTranslationEntity[]
}
