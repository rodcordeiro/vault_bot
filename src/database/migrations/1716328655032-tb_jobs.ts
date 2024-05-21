import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class TbJobs1716328655032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vb_tb_jobs',
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
            name: 'place',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'vb_tb_jobs',
      new TableForeignKey({
        columnNames: ['place'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vb_tb_builds',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_build_job',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vb_tb_jobs', 'FK_build_job');
    await queryRunner.dropTable('vb_tb_jobs');
  }
}
