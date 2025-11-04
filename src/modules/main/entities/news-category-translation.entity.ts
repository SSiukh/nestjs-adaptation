import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './news-category.entity'

@Entity('news_category_translations')
export class NewsCategoryTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryTranslationId: string

  @ManyToOne(() => NewsCategoryEntity, (category) => category.translationList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'news_category_id' })
  category?: NewsCategoryEntity

  @Column()
  lang: string

  @Column()
  title: string
}
