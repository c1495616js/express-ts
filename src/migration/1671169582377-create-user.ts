import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUser1671169582377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                email VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "user";`);
  }
}
