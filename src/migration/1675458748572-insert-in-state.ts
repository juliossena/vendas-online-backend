import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertInState1675458748572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            INSERT INTO state("id", "name", "uf") VALUES (1, 'Acre', 'AC');
            INSERT INTO state("id", "name", "uf") VALUES (2, 'Alagoas', 'AL');
            INSERT INTO state("id", "name", "uf") VALUES (3, 'Amazonas', 'AM');
            INSERT INTO state("id", "name", "uf") VALUES (4, 'Amapá', 'AP');
            INSERT INTO state("id", "name", "uf") VALUES (5, 'Bahia', 'BA');
            INSERT INTO state("id", "name", "uf") VALUES (6, 'Ceará', 'CE');
            INSERT INTO state("id", "name", "uf") VALUES (7, 'Distrito Federal', 'DF');
            INSERT INTO state("id", "name", "uf") VALUES (8, 'Espírito Santo', 'ES');
            INSERT INTO state("id", "name", "uf") VALUES (9, 'Goiás', 'GO');
            INSERT INTO state("id", "name", "uf") VALUES (10, 'Maranhão', 'MA');
            INSERT INTO state("id", "name", "uf") VALUES (11, 'Minas Gerais', 'MG');
            INSERT INTO state("id", "name", "uf") VALUES (12, 'Mato Grosso do Sul', 'MS');
            INSERT INTO state("id", "name", "uf") VALUES (13, 'Mato Grosso', 'MT');
            INSERT INTO state("id", "name", "uf") VALUES (14, 'Pará', 'PA');
            INSERT INTO state("id", "name", "uf") VALUES (15, 'Paraíba', 'PB');
            INSERT INTO state("id", "name", "uf") VALUES (16, 'Pernambuco', 'PE');
            INSERT INTO state("id", "name", "uf") VALUES (17, 'Piauí', 'PI');
            INSERT INTO state("id", "name", "uf") VALUES (18, 'Paraná', 'PR');
            INSERT INTO state("id", "name", "uf") VALUES (19, 'Rio de Janeiro', 'RJ');
            INSERT INTO state("id", "name", "uf") VALUES (20, 'Rio Grande do Norte', 'RN');
            INSERT INTO state("id", "name", "uf") VALUES (21, 'Rondônia', 'RO');
            INSERT INTO state("id", "name", "uf") VALUES (22, 'Roraima', 'RR');
            INSERT INTO state("id", "name", "uf") VALUES (23, 'Rio Grande do Sul', 'RS');
            INSERT INTO state("id", "name", "uf") VALUES (24, 'Santa Catarina', 'SC');
            INSERT INTO state("id", "name", "uf") VALUES (25, 'Sergipe', 'SE');
            INSERT INTO state("id", "name", "uf") VALUES (26, 'São Paulo', 'SP');
            INSERT INTO state("id", "name", "uf") VALUES (27, 'Tocantins', 'TO');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public.state;
        `);
  }
}
