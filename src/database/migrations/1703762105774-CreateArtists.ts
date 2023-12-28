import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateArtists1703762105774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "artists",
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
                     name: "name",
                     type: "varchar",
                     length: "255",
                     isUnique: true,
                     
                  },
                  {
                    name: "portfolio",
                    type: "varchar",
                    length: "255",
                    
                 },

               ],
               foreignKeys: [
               {
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
               },
            ],
            }),
            true
         );
      }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artists");
    }

}
