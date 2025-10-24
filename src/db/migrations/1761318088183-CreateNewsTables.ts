import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewsTables1761318088183 implements MigrationInterface {
    name = 'CreateNewsTables1761318088183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appeal" ("id" SERIAL NOT NULL, "title" character varying, "slug" text NOT NULL, "thumbnailUrl" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "publishedAt" TIMESTAMP, "isPublished" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying NOT NULL, "title" character varying NOT NULL, "shortDescription" text NOT NULL, "news_id" uuid, CONSTRAINT "PK_aa28099d8337dedcf1fb7537bbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "news_translations" ADD CONSTRAINT "FK_f6463f823b5554ecccc3312370a" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_translations" DROP CONSTRAINT "FK_f6463f823b5554ecccc3312370a"`);
        await queryRunner.query(`DROP TABLE "news_translations"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "appeal"`);
    }

}
