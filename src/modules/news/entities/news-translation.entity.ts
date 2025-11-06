import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'

@Entity('news_translations')
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  translationId: string

  @ManyToOne(() => NewsEntity, (news) => news.translationList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'news_id' })
  news?: NewsEntity

  @Column()
  lang: string

  @Column({ nullable: true })
  title: string

  @Column('text', { nullable: true })
  description: string

  @Column({ nullable: true })
  thumbnailUrl: string

  @Column('text', { nullable: true })
  htmlContent: string

  @Column('text', { nullable: true })
  metaDescription: string

  @Column('text', { nullable: true })
  metaKeywords: string

  @Column('text', { nullable: true })
  ogDescription: string

  @Column({ nullable: true })
  ogImageUrl: string

  @Column({ nullable: true })
  metaTitle: string

  @Column({ nullable: true })
  ogTitle: string
}
