import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTablePayment1676323446877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            alter table public.payment alter column amount_payments drop not null;
            alter table public.payment alter column code drop not null;
            alter table public.payment alter column date_payment drop not null;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        `);
  }
}
