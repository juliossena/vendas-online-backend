import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableProduct1678189577114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE "product" ADD "weight" double precision NOT NULL DEFAULT 0;
            ALTER TABLE "product" ADD "length" integer NOT NULL DEFAULT 0;
            ALTER TABLE "product" ADD "height" integer NOT NULL DEFAULT 0;
            ALTER TABLE "product" ADD "width" integer NOT NULL DEFAULT 0;
            ALTER TABLE "product" ADD "diameter" integer NOT NULL DEFAULT 0;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE "product" drop "weight";
            ALTER TABLE "product" drop "length";
            ALTER TABLE "product" drop "height";
            ALTER TABLE "product" drop "width";
            ALTER TABLE "product" drop "diameter";
        `);
  }
}
