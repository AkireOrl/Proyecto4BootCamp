import { AppDataSource } from "../data-source";
import { ArtistFactory } from "../factories/ArtistFactory";
import { Artist } from "../../models/Artist";
import { seedUsersWithRoles } from "./UserSeeder";
import { UserRoles } from "../../constants/UserRoles";
import { Admin } from "typeorm";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de estudiantes y su almacenamiento en la base de datos.
 */
export const artistSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de estudiantes a crear
      const count = 20;

      // Llamar a la función para crear estudiantes con usuarios asociados
      await seedArtistsWithUser(count);

      // Imprimir mensaje de éxito
      console.log("Seeding artist successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedArtistsWithUser = async (count: number) => {
   // Obtener repositorios y fábricas necesarios
   const artistRepository = AppDataSource.getRepository(Artist);
   const artistFactory = new ArtistFactory(artistRepository);

   // Generar usuarios asociados a roles de estudiantes
   const users = await seedUsersWithRoles({
      roles: [UserRoles.ADMIN],
      count: count,
   });

   // Generar estudiantes
   const artist = artistFactory.createMany(count);

   // Asignar usuario a cada estudiante
   artist.forEach((artist, index) => {
      artist.users = users[index];
   });

   // Guardar estudiantes en la base de datos
   await artistRepository.save(artist);

   return artist;
};