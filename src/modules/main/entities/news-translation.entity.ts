import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'

@Entity('news_translations')
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsEntity, (news) => news.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'news_id' })
  news: NewsEntity

  @Column()
  lang: string

  @Column()
  title: string

  @Column('text')
  shortDescription: string
}
