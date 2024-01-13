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

export const appFOOOT = async () => {
   try {

      await AppDataSource.initialize();

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointmentFactory = new AppointmentFactory(appointmentRepository);
      const userRepository = AppDataSource.getRepository(User);
      const artistRepository = AppDataSource.getRepository(Artists);
      

      const usersWithUserRole = await userRepository.find({ take: 5 });
      const usersWithAdminRole = await artistRepository.find({ take: 5 });

     
      // Create appointments for users with the 'user' role
      for (const user of usersWithUserRole) {
         const appointment = new Appointment();
         // Set appointment details based on your schema
         appointment.user = user;
         // ... other appointment details
         await appointmentRepository.save(appointment);
      }

      // Create appointments for users with the 'admin' role
      for (const artist of usersWithAdminRole) {
         const appointment = new Appointment();
         // Set appointment details based on your schema
         appointment.artist = artist;
         // ... other appointment details
         await appointmentRepository.save(appointment);
      }

      // Seed the database with some basic data if it's empty


      // Create users to be associated with the appointments
      //   const userCount = 5;
      //   const artistCount = 5;


      //   const users = await seedUsersWithRoles({
      //    roles: [UserRoles.USER],
      //    count: userCount,
      // });

      // const artist = await seedUsersWithRoles({
      //    roles :[UserRoles.ADMIN],
      //    count: artistCount,
      // });
      //   //const artist = await seedArtistsWithUser(artistCount);

      //   //Traer usuarios
      //   const usuariosConRoleUser = await userRepository.find({
      //    select: {
      //       id: true,
      //       username: true,
      //    },
      //   });
      //   const usuariosConRoleAdmin = await artistRepository.find({
      //    select:{
      //       id:true,

      //    },
      //   });

      // //   console.log('Usuarios con role USER',usuariosConRoleUser);
        //Numero de citas a generar

        const count = 5;

        //Generar Citas

        const appointments = appointmentFactory.createMany(count);

        appointments.map((appointment, index) => {
         appointment.user = user[index];
         appointment.artist = artist[index];

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