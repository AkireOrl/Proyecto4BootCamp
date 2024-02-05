import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { Artists } from "../models/Artist";
import { In } from 'typeorm';

// export const ProfileController = {
//     async userProfile(req: Request, res: Response): Promise<Response<any>> {
//       try {
//         const email = req.tokenData.email;
//         const userRepository = AppDataSource.getRepository(User);
//         const appointmentsRepository = AppDataSource.getRepository(Appointment);
//         const artistRepository = AppDataSource.getRepository(Artists);
  
//         const profileUser = await userRepository.findOneBy({ 
//             email
//          })
  
//         if (!profileUser) {
//           return res.status(404).json({ message: 'Profile not found' });
//         } else {
//           const { id, username, name, surname, email, photo } = profileUser;
//           const appointments = await appointmentsRepository.findBy({
//            user_id: id
//            });
//           const userArtist =  await appointmentsRepository.find({
//             where:{
//                 artist_id : id
//                 },
//               relations: ["user"],
//               select: {
//                 user_id
//               }
            
//         });
//           return res.status(200).json({ profileUser, appointments});
//         }
//       } catch (err) {
//         console.error('Error in the profile controller', err);
//         return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
//       }
//     }
//   }

// export const ProfileController = {
//     async userProfile(req: Request, res: Response): Promise<Response<any>> {
//       try {
//         const email = req.tokenData.email;
//         const userRepository = AppDataSource.getRepository(User);
//         const appointmentsRepository = AppDataSource.getRepository(Appointment);
//         const artistRepository = AppDataSource.getRepository(Artists);
  
//         const profileUser = await userRepository.findOneBy({ 
//             email
//          })

  
//         if (!profileUser) {
//           return res.status(404).json({ message: 'Profile not found' });
//         } else {
//           const { id, username, name, surname, email, photo } = profileUser;
//           const appointments = await appointmentsRepository.findBy({
//            user_id: id,
//             });
            
//          const userArtist = await userRepository.find({
//             where: {
//                 artist: true
//             },
//           relations: ['artist'],
//           select: [
//               "id",
//           ]
//             })
//             .then((usersArtist)=>{
//                 usersArtist.forEach(user =>{
//                     if(user.artist?.id === profileUser.artist_id){
//                          = true;
//                     }else{
//                         user.isMyArtist = false;
//                     }
//                 })

          
//           return res.status(200).json({ profileUser, appointments, usersArtist });
//         }
//       } catch (err) {
//         console.error('Error in the profile controller', err);
//         return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
//       }
//     }
//   }


// ...

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
        const artistProfiles = await artistRepository.findBy({
          id: In(artistIds), // use 'In' operator instead of 'Op.in'
        });

        const userArtistIds = artistProfiles.map((artistProfile) => artistProfile.user_id);
        const userArtistProfiles = await userRepository.findBy({
          id: In(userArtistIds), // use 'In' operator instead of 'Op.in'
        });

        return res.status(200).json({ profileUser, appointments, artistProfiles, userArtistProfiles });
      }
    } catch (err) {
      console.error('Error in the profile controller', err);
      return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
    }
  },
};