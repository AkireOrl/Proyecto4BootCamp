import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/ApointmentFactory";
import { Appoinment } from "../../models/Appoinment";
import { seedArtistsWithUser } from "./ArtistSeeder"; 
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";
import { Artist } from "../../models/Artist";

//-----------------------

export const appointmentSeeder = async () => {
    try{

        await AppDataSource.initialize();

        const appoimentsRepository = AppDataSource.getRepository(Appoinment);
        const appointmentFactory = new AppointmentFactory(appoimentsRepository);

        // Create users to be associated with the appointments

        const usersCounts = 5;
        const artistsCounts = 5;
        //const users = await seedUsersWithRoles(usersCounts);

        const artist = await seedArtistsWithUser(artistsCounts);


        









} catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }

}