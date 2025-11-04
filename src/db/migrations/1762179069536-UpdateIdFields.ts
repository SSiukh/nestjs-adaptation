import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIdFields1762179069536 implements MigrationInterface {
    name = 'UpdateIdFields1762179069536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`);
        await queryRunner.query(`ALTER TABLE "news_translations" RENAME COLUMN "id" TO "translationId"`);
        await queryRunner.query(`ALTER TABLE "news_translations" RENAME CONSTRAINT "PK_aa28099d8337dedcf1fb7537bbc" TO "PK_830f84141a046b10efae2798ebd"`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "newsCategoryId" TO "newsCategoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME COLUMN "id" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME CONSTRAINT "PK_aac53a9364896452e463139e4a0" TO "PK_8e361c2d8de34e5974e2efd1c61"`);
        await queryRunner.query(`ALTER TABLE "news_category_translations" RENAME COLUMN "id" TO "categoryTranslationId"`);
        await queryRunner.query(`ALTER TABLE "news_category_translations" RENAME CONSTRAINT "PK_b28949db42f49a5e24594df158c" TO "PK_4b4d5589cd52445691fdb170b18"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_da3fef836ef8d1f77a18b52ff39" FOREIGN KEY ("newsCategoryCategoryId") REFERENCES "news_category"("categoryId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_da3fef836ef8d1f77a18b52ff39"`);
        await queryRunner.query(`ALTER TABLE "news_category_translations" RENAME CONSTRAINT "PK_4b4d5589cd52445691fdb170b18" TO "PK_b28949db42f49a5e24594df158c"`);
        await queryRunner.query(`ALTER TABLE "news_category_translations" RENAME COLUMN "categoryTranslationId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME CONSTRAINT "PK_8e361c2d8de34e5974e2efd1c61" TO "PK_aac53a9364896452e463139e4a0"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME COLUMN "categoryId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "newsCategoryCategoryId" TO "newsCategoryId"`);
        await queryRunner.query(`ALTER TABLE "news_translations" RENAME CONSTRAINT "PK_830f84141a046b10efae2798ebd" TO "PK_aa28099d8337dedcf1fb7537bbc"`);
        await queryRunner.query(`ALTER TABLE "news_translations" RENAME COLUMN "translationId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "news_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
