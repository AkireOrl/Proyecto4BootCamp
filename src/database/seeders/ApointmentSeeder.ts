import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/ApointmentFactory";
import { Appoinment } from "../../models/Appoinment";
import { seedArtistsWithUser } from "./ArtistSeeder"; 
import { seedUsersWithRoles } from "./UserSeeder";
import { Role } from "../../models/Role";
import { UserFactory } from "../factories/UserFactory"; 
import { User } from "../../models/User";
import { Artist } from "../../models/Artist";

//-----------------------

export const appointmentSeeder = async () => {
    try{

        await AppDataSource.initialize();

        const appointmentRepository = AppDataSource.getRepository(Appoinment);
        const appointmentFactory = new AppointmentFactory(appointmentRepository);
        const userRepository = AppDataSource.getRepository(User);
        const artistRepository = AppDataSource.getRepository(Artist);


        // Create users to be associated with the appointments
        const userCount = 5;
        const artistCount = 5;
        

        const users = await seedUsersWithRoles(usersCount);
        const artist = await seedArtistsWithUser(artistCount);
        //Numero de citas a generar

        const count = 5;

        //Generar Citas

        const appointments = appointmentFactory.createMany(count);

        // Guardar los cursos en la base de datos
      // await appoimentRepository.save(appointments);

  
      
        









} catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }

}