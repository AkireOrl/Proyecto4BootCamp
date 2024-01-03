import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsers1703715862010 } from "./migrations/1703715862010-CreateUsers";
import { CreateRoles1703715189136 } from "./migrations/1703715189136-CreateRoles";
import { CreateAppoiments1703763685315 } from "./migrations/1703763685315-CreateAppoiments";
import { CreateDesigns1703763946508 } from "./migrations/1703763946508-CreateDesigns";
import { CreateArtists1704301084949 } from "./migrations/1704301084949-CreateArtists";
// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "tatushop",
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
  // migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   migrations: [
      CreateUsers1703715862010,
      CreateRoles1703715189136,
      CreateArtists1704301084949,
      CreateAppoiments1703763685315,
      CreateDesigns1703763946508,
   ],
   synchronize: false,
   logging: false,
});

//console.log(`${__dirname}/migrations`);

