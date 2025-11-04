import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNewsTable1761740908241 implements MigrationInterface {
    name = 'UpdateNewsTable1761740908241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "htmlContent" text`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "metaDescription" text`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "metaKeywords" text`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "ogDescription" text`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "ogImageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "metaTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD "ogTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "news" ADD "publishedHour" integer`);
        await queryRunner.query(`ALTER TABLE "news" ADD "publishedMinute" integer`);
        await queryRunner.query(`ALTER TABLE "news" ADD "publishedSecond" integer`);
        await queryRunner.query(`ALTER TABLE "news" ADD "newsCategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "thumbnailUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "news_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`);
        await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "thumbnailUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news_translations" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "newsCategoryId"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "publishedSecond"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "publishedMinute"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "publishedHour"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "ogTitle"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "metaTitle"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "ogImageUrl"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "ogDescription"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "metaKeywords"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "metaDescription"`);
        await queryRunner.query(`ALTER TABLE "news_translations" DROP COLUMN "htmlContent"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
