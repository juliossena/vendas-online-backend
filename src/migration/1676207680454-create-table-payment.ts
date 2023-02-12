import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTablePayment1676207680454 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE public.payment (
                id integer NOT NULL,
                status_id int NOT NULL,
                price double precision NOT NULL,
                discount double precision NOT NULL,
                final_price double precision NOT NULL,
                "type" character varying NOT NULL,
                amount_payments int NOT NULL,
                code character varying NOT NULL,
                date_payment timestamp without time zone,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (status_id) references public.payment_status(id)
            );
            
            CREATE SEQUENCE public.payment_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;
            
            ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE public.payment
        `);
  }
}
