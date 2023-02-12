import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableOrderProduct1676210155094
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE public.order_product (
                id integer NOT NULL,
                order_id int NOT NULL,
                product_id int NOT NULL,
                amount int NOT NULL,
                price int NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (order_id) references public.order(id),
                foreign key (product_id) references public.product(id)
            );
            
            CREATE SEQUENCE public.order_product_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            ALTER SEQUENCE public.order_product_id_seq OWNED BY public.order_product.id;
            
            ALTER TABLE ONLY public.order_product ALTER COLUMN id SET DEFAULT nextval('public.order_product_id_seq'::regclass);
        
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE public.order_product
        `);
  }
}
