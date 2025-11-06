import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { CommandModule } from 'nestjs-command'

import { AppealModule } from './modules/appeal'
import { NewsModule } from './modules/news'
import { NewsCategoryModule } from './modules/news-category'

import { DatabaseNamingStrategy } from 'src/db/database-naming.strategy'

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: false,
        logging: false,
        namingStrategy: new DatabaseNamingStrategy(),
        entities: [`${__dirname}/**/*.entity{.js,.ts}`],
        migrations: [`${__dirname}/**/migrations/*{.js,.ts}`],
      }),
      inject: [ConfigService],
    }),
    CommandModule,
    AppealModule,
    NewsModule,
    NewsCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
