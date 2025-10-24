import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsTranslationEntity } from './news-translation.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date

  @Column({ default: false })
  isPublished: boolean

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news, { cascade: true })
  translations: NewsTranslationEntity[]
}
