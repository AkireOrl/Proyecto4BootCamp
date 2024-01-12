import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { seedArtistsWithUser } from "./ArtistSeeder"; 
import { seedUsersWithRoles } from "./UserSeeder";
import { Role } from "../../models/Role";
import { UserFactory } from "../factories/UserFactory"; 
import { User } from "../../models/User";
import { Artists } from "../../models/Artist";
import { UserRoles } from "../../constants/UserRoles";
import { Index } from "typeorm";


//-----------------------

export const appointmentSeeder = async () => {
    try{

        await AppDataSource.initialize();

        const appointmentRepository = AppDataSource.getRepository(Appointment);
        const appointmentFactory = new AppointmentFactory(appointmentRepository);
        const userRepository = AppDataSource.getRepository(User);
        const artistRepository = AppDataSource.getRepository(Artists);


        // Create users to be associated with the appointments
        const userCount = 5;
        const artistCount = 5;
        

        const users = await seedUsersWithRoles({
         roles: [UserRoles.USER],
         count: userCount,
      });

      const artist = await seedUsersWithRoles({
         roles :[UserRoles.ADMIN],
         count: artistCount,
      });
        //const artist = await seedArtistsWithUser(artistCount);

        //Traer usuarios
        const usuariosConRoleUser = await userRepository.find({
         select: {
            id: true,
            username: true,
         },
        });
        const usuariosConRoleAdmin = await artistRepository.find({
         select:{
            id:true,
            name: true,
         },
        });
   
      //   console.log('Usuarios con role USER',usuariosConRoleUser);
        //Numero de citas a generar

        const count = 5;

        //Generar Citas

        const appointments = appointmentFactory.createMany(count);

        appointments.map((appointment, index) => {
         appointment.user = users[index];
         

        })

        // Guardar las citas en la base de datos
      await appointmentRepository.save(appointments);

  
      
        









} catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }

}