import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertRootInUserDemo1678189577115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO public."user"(
                name, email, cpf, type_user, phone, password)
                VALUES ('admin', 'admin1@admin.com', '123456789', 2, '31925325252', '$2b$10$QjlsSwxODBf19eV7Txnquejj/3R89wmzJ0KxhgZaoC3nWOnfQ8nTa');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public."user"
                WHERE email like 'root@root.com';
        `);
  }
}
