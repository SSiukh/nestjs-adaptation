import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNewsAndUpdateCategoryEntities1761735094488 implements MigrationInterface {
    name = 'UpdateNewsAndUpdateCategoryEntities1761735094488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "shortDescription"`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "thumbnailUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "UQ_d09152c44881b7620e12d6df099" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "UQ_d09152c44881b7620e12d6df099"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "thumbnailUrl"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "shortDescription" text NOT NULL`);
    }

}
