import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class TbDwellers1716329042862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'vb_tb_dwellers',
      new TableIndex({
        columnNames: [
          'id',
          'strength',
          'perception',
          'endurance',
          'charism',
          'intelligence',
          'agility',
          'luck',
        ],
        name: 'idx_dwellers_attrb',
      }),
    );
    await queryRunner.createIndex(
      'vb_tb_dwellers',
      new TableIndex({
        columnNames: ['id', 'father'],
        name: 'idx_dwellers_father',
      }),
    );
    await queryRunner.createIndex(
      'vb_tb_dwellers',
      new TableIndex({
        columnNames: ['id', 'mother'],
        name: 'idx_dwellers_mother',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('vb_tb_dwellers', 'idx_dwellers_attrb');
    await queryRunner.dropIndex('vb_tb_dwellers', 'idx_dwellers_father');
    await queryRunner.dropIndex('vb_tb_dwellers', 'idx_dwellers_mother');
  }
}
