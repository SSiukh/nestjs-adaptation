import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNewsAndCreateCategories1761672932315 implements MigrationInterface {
    name = 'UpdateNewsAndCreateCategories1761672932315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aac53a9364896452e463139e4a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_category_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying NOT NULL, "title" character varying NOT NULL, "news_category_id" uuid, CONSTRAINT "PK_b28949db42f49a5e24594df158c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news_category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_category_translations" ADD CONSTRAINT "FK_e52bd391937cf521c4be68ea6d7" FOREIGN KEY ("news_category_id") REFERENCES "news_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_category_translations" DROP CONSTRAINT "FK_e52bd391937cf521c4be68ea6d7"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "news_category_translations"`);
        await queryRunner.query(`DROP TABLE "news_category"`);
    }

}
