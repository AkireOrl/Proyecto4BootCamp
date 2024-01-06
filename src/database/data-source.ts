import "reflect-metadata";
import { DataSource } from "typeorm";

import { CreateRoles1704562633107 } from "./migrations/1704562633107-CreateRoles";
import { CreateUsers1704562644836 } from "./migrations/1704562644836-CreateUsers";
import { CreateArtists1704562654443 } from "./migrations/1704562654443-CreateArtists";
import { CreateAppoiments1704562664928 } from "./migrations/1704562664928-CreateAppoiments";
import { CreateDesigns1704562673576 } from "./migrations/1704562673576-CreateDesigns";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "tatushopp",
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
  // migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   migrations: [
     CreateRoles1704562633107,
     CreateUsers1704562644836,
     CreateArtists1704562654443,
     CreateAppoiments1704562664928,
     CreateDesigns1704562673576

   ],
   synchronize: false,
   logging: false,
});

//console.log(`${__dirname}/migrations`);

