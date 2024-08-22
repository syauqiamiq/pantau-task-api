import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProjectTeamMemberTable1724320611185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_team_members',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
            generationStrategy: 'uuid',
            isUnique: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'project_member_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'project_team_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        indices: [
          {
            name: 'IDX_PROJECT_TEAM_MEMBER_PROJECT_MEMBER_ID',
            columnNames: ['project_member_id'],
          },
          {
            name: 'IDX_PROJECT_TEAM_MEMBER_PROJECT_TEAM_ID',
            columnNames: ['project_team_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['project_member_id'],
            referencedTableName: 'project_members',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['project_team_id'],
            referencedTableName: 'project_teams',
            referencedColumnNames: ['id'],
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_team_members', true, true, true);
  }
}
