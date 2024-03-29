import { MigrationInterface, QueryRunner,Table  } from "typeorm"

export class CreateArtists1704837137436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "artist",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                    name: "user_id",
                    type: "int",     
                    isPrimary: true,              
                 },
                  {
                    name: "portfolio",
                    type: "varchar",
                    length: "1000", 
                    default: "'https://img.freepik.com/vector-gratis/serpiente-entrelazada-plantilla-calavera_225004-1348.jpg'",                       
                 },
                 {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                },

               ],
               foreignKeys: [
               {
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", // when user is deleted, artist related to this
               },
            ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artist");
    }

}
