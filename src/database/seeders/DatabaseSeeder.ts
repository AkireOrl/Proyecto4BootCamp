import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { artistSeeder } from "./ArtistSeeder";
import { appointmentSeeder } from "./appSEEDERS";

// -----------------------------------------------------------------------------

(async() => {
    await roleSeeder();
    await userSeeder();
    //await artistSeeder();
    //await appointmentSeeder();
})();


