import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { artistSeeder } from "./ArtistSeeder";
import { appointmentSeeder } from "./AppointmentSeeder";

// -----------------------------------------------------------------------------

(async() => {
    await roleSeeder();
    await userSeeder();
    await artistSeeder();
    await appointmentSeeder();
})();


