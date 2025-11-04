import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNewsCategotyTableAddIsPublished1761751298784 implements MigrationInterface {
    name = 'UpdateNewsCategotyTableAddIsPublished1761751298784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_category" ADD "isPublished" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_category" DROP COLUMN "isPublished"`);
    }

}
