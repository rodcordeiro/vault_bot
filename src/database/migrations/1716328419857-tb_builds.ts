import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TbBuilds1716328419857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vb_tb_builds',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'owner',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          {
            name: 'lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'attribute',
            type: 'char',
            isNullable: false,
          },
          {
            name: 'max_workers',
            type: 'int',
            isNullable: false,
            default: 2,
          },
          {
            name: 'combined',
            type: 'int',
            isNullable: false,
            default: 1,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vb_tb_builds');
  }
}
