import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNewsCategotyTableAddPublishedAt1761811758802 implements MigrationInterface {
    name = 'UpdateNewsCategotyTableAddPublishedAt1761811758802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_category" ADD "publishedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_category" DROP COLUMN "publishedAt"`);
    }

}
