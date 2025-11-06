import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppeal1762336894054 implements MigrationInterface {
    name = 'CreateAppeal1762336894054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appeal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "finishedAt" TIMESTAMP NOT NULL, "type" "public"."appeal_type_enum" NOT NULL, "ipn" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "UQ_d06542789155a67669d85ae55fd" UNIQUE ("email"), CONSTRAINT "UQ_8a01a0fde0122333acf8acc2011" UNIQUE ("ipn"), CONSTRAINT "PK_f644a99d2dfcff9facb08bd1697" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appeal"`);
    }

}
