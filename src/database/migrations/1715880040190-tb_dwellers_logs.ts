import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class TbDwellersLogs1715880040190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vb_tb_dwellers_logs',
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
            name: 'dweller',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'char',
            isNullable: false,
          },
          {
            name: 'lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'father',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mother',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'strength',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'perception',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'endurance',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'charism',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'intelligence',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'agility',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'luck',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'action',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vb_tb_dwellers_logs');
  }
}
