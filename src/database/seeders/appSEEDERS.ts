import { AppDataSource } from "../data-source";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { User } from "../../models/User";
import { Artists } from "../../models/Artist";
import { Role } from "../../models/Role";
import { UserRoles } from "../../constants/UserRoles";
import { UserFactory } from "../factories/UserFactory";

export const appointmentSeeder = async () => {
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
    const userCount = 5;
    const artistCount = 5;

    const users = UserFactory.createMany(userCount, { roles: [UserRoles.USER] });
    const artists = UserFactory.createMany(artistCount, { roles: [UserRoles.ADMIN] });

    // Guardar las citas en la base de datos
    const appointments = appointmentFactory.createMany(5);



    await appointmentRepository.save(appointments);
  } catch (error) {
    console.error("Error during appointmentSeeder:", error);
  }
};

appointmentSeeder();