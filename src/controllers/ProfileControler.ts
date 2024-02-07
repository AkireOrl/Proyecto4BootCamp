import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { Artists } from "../models/Artist";
import { In } from 'typeorm';


// export const ProfileController = {
//   async userProfile(req: Request, res: Response): Promise<Response<any>> {
//     try {
//       const email = req.tokenData.email;
//       const userRepository = AppDataSource.getRepository(User);
//       const appointmentsRepository = AppDataSource.getRepository(Appointment);
//       const artistRepository = AppDataSource.getRepository(Artists);

//       const profileUser = await userRepository.findOneBy({
//         email,
//       });

//       if (!profileUser) {
//         return res.status(404).json({ message: 'Profile not found' });
//       } else {
//         const { id } = profileUser;
//         const appointments = await appointmentsRepository.findBy({
//           user_id: id,
//         });

//         const artistIds = appointments.map((appointment) => appointment.artist_id);
//         const artistProfiles = await artistRepository.findBy({
//           id: In(artistIds), 
//         });

//         const userArtistIds = artistProfiles.map((artistProfile) => artistProfile.user_id);
//         const userArtistProfiles = await userRepository.findBy({
//           id: In(userArtistIds), 
//         });

        

//         return res.status(200).json({ profileUser, appointments, artistProfiles, userArtistProfiles });
//       }
//     } catch (err) {
//       console.error('Error in the profile controller', err);
//       return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
//     }
//   },
// };



export const ProfileController = {
  async userProfile(req: Request, res: Response): Promise<Response<any>> {
    try {
      const email = req.tokenData.email;
      const userRepository = AppDataSource.getRepository(User);
      const appointmentsRepository = AppDataSource.getRepository(Appointment);
      const artistRepository = AppDataSource.getRepository(Artists);

      const profileUser = await userRepository.findOneBy({
        email,
      });

      if (!profileUser) {
        return res.status(404).json({ message: 'Profile not found' });
      } else {
        const { id } = profileUser;
        const appointments = await appointmentsRepository.findBy({
          user_id: id,
        });

        const artistIds = appointments.map((appointment) => appointment.artist_id);
        if (artistIds.length === 0) {
          // return res.status(200).json({ profileUser, appointments, userArtistIds: [] });
        }

        const userArtistIds = await artistRepository.createQueryBuilder('artists')
          .innerJoinAndSelect('artists.user', 'user')
          .where('artists.id IN (:...artistIds)', { artistIds })
          .getMany()
          .then(artistProfiles => artistProfiles.map(artistProfile => artistProfile.user.name));

        return res.status(200).json({ profileUser, appointments, userArtistIds });
      }
    } catch (err) {
      console.error('Error in the profile controller', err);
      return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
    }
  },
};



































// export const ProfileController = {
//   async userProfile(req: Request, res: Response): Promise<Response<any>> {
//     try {
//       const id = req.tokenData.userId;
//       const userRepository = AppDataSource.getRepository(User);
//       const appointmentsRepository = AppDataSource.getRepository(Appointment);
//       const artistRepository = AppDataSource.getRepository(Artists);

//       const profileUser = await userRepository
//         .createQueryBuilder("user")
//         .where("user.id = :id", { id })
//         .getOne();

//       if (!profileUser) {
//         return res.status(404).json({ message: "Profile not found" });
//       } else {
//         const { id } = profileUser;
//         const appointments = await appointmentsRepository
//           .createQueryBuilder("appointment")
//           .where("appointment.user_id = :id", { id })
//           .getMany();

//           const artistIds = appointments.map((appointment) => appointment.artist_id);
//           const artistProfiles = await artistRepository
//             .createQueryBuilder("artist")
//             .where("artist.id IN (:...artistIds)", { artistIds })
//             .leftJoinAndSelect("user_id", "users")
//             .select(["user_id"])
//             .getMany();

//         return res.status(200).json({ profileUser, appointments});
//       }
//     } catch (err) {
//       console.error("Error in the profile controller", err);
//       return res.status(401).json({ status: "Error", message: "Not authorized." });
//     }
//   },
// };