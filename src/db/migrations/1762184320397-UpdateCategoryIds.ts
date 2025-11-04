import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategoryIds1762184320397 implements MigrationInterface {
    name = 'UpdateCategoryIds1762184320397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_da3fef836ef8d1f77a18b52ff39"`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "newsCategoryCategoryId" TO "newsCategoryId"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME COLUMN "categoryId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME CONSTRAINT "PK_8e361c2d8de34e5974e2efd1c61" TO "PK_aac53a9364896452e463139e4a0"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_6573fe000551c966d07f27513c0" FOREIGN KEY ("newsCategoryId") REFERENCES "news_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_6573fe000551c966d07f27513c0"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME CONSTRAINT "PK_aac53a9364896452e463139e4a0" TO "PK_8e361c2d8de34e5974e2efd1c61"`);
        await queryRunner.query(`ALTER TABLE "news_category" RENAME COLUMN "id" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "newsCategoryId" TO "newsCategoryCategoryId"`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_da3fef836ef8d1f77a18b52ff39" FOREIGN KEY ("newsCategoryCategoryId") REFERENCES "news_category"("categoryId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
