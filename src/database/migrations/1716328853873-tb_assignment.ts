import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class TbAssignment1716328853873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vb_tb_assignments',
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
            length: '40',
            isNullable: false,
          },
          {
            name: 'job',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'vb_tb_assignments',
      new TableForeignKey({
        columnNames: ['job'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vb_tb_jobs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_job_assignment',
      }),
    );
    await queryRunner.createForeignKey(
      'vb_tb_assignments',
      new TableForeignKey({
        columnNames: ['dweller'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vb_tb_dwellers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_dweller_assignment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vb_tb_assignments', 'FK_job_assignment');
    await queryRunner.dropForeignKey(
      'vb_tb_assignments',
      'FK_dweller_assignment',
    );
    await queryRunner.dropTable('vb_tb_assignments');
  }
}
