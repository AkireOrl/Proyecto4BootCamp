import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { Artists } from "../models/Artist";
import { UserRoles } from "../constants/UserRoles";
import {
   CreateUserRequestBody,
   CreateArtistRequestBody,
   TokenData,
} from "../types/types";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { isAdmin } from "../middlewares/isAdmin";
import { Role } from "../models/Role";
import { Admin } from "typeorm";
// -----------------------------------------------------------------------------

export class ArtistController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
          const artistRepository = AppDataSource.getRepository(Artists);
  
          const allArtists = await artistRepository.find({
              relations: ['user'],
          });
  
          const userArtistIds = allArtists.map(artist => {
              return {
                  id: artist.id,
                  name: artist.user.name,
                  surname: artist.user.surname,
                  photo:  artist.user.photo,
                  email: artist.user.email,
              };
          });
  
          res.status(200).json({ userArtistIds });
  
      } catch (error) {
          res.status(500).json({
              message: "Error while getting artist",
          });
      }
  }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         // console.log(id, "Soy console de getById")

         const artistRepository = AppDataSource.getRepository(Artists);
         const artist = await artistRepository.findOneBy({
            id: id,

         });

         if (!artist) {
            return res.status(404).json({
               message: "Artist not found",
            });
         }

         res.status(200).json(artist);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting artist",
         });
      }
   }

   async create(
      req: Request<{}, {}, CreateArtistRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, name, surname, password, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);


      try {
         // Crear nuevo usuario
         const newUser: User = {
            username,
            name,
            surname,
            email,
            password: bcrypt.hashSync(password, 10),
            roles: [UserRoles.ADMIN],
         };
         await userRepository.save(newUser);

         //Crear nuevo artista asociado al usuario

         if (newUser.roles.includes(UserRoles.ADMIN)) {
            // Si es un artista, también crea una entrada en la tabla de artistas. 
            const artistRepository = AppDataSource.getRepository(Artists);
            const newArtist = artistRepository.create({
               user_id: newUser.id, // Asocia el nuevo artista con el usuario recién creado. 
               portfolio: req.body.portfolio || '',
            });

            await artistRepository.save(newArtist);
         }

         res.status(201).json("Artist create successfully");
      } catch (error: any) {
         console.error("Error while creating artist:", error);
         res.status(500).json({
            message: "Error while creating artis",
            error: error.message,
         });
      }
   }


   async update(req: Request, res: Response): Promise<void | Response<any>> { //actualiza, solo la parte del portfolio
      try {
        const artistRepository = AppDataSource.getRepository(Artists);
        const userRepository = AppDataSource.getRepository(User);
        const userId = req.tokenData.userId;
    
        // Find the user by id
        const user = await userRepository.findOne({
          where: { id: +userId },
          relations: ['artist'],
        });
    
        if (!user) {
          throw new Error('User not found');
        }
    
        // Check if the user is an artist
        if (!user.artist) {
          throw new Error('User is not an artist');
        }
        const data = req.body;
        const { portfolio } = req.body;
    
        // Update the artist
        await artistRepository.update(user.artist.id, { portfolio });
    
        // No need to update the user since we're only modifying the associated artist
       
    
        res.status(202).json({
          message: 'Artist portfolio updated successfully',
        });
      } catch (error) {
        res.status(500).json({
          message: 'Error while updating artist portfolio',
        });
      }
    }

  

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const artistRepository = AppDataSource.getRepository(Artists);
         await artistRepository.delete(id);

         res.status(200).json({
            message: "Artist deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting Artist",
         });
      }
   }

   async getByArtistId(req: Request, res: Response): Promise<void | Response<any>> { //funcionando
      try {
         const id = +req.params.id;
         //console.log(id, "Soy console de getByArtistId")

         const artistRepository = AppDataSource.getRepository(Artists);
         const artist = await artistRepository.findOneBy({
            id: id,

         });

         const userRepository = AppDataSource.getRepository(User);
         let userArtist = await userRepository.findBy({
               artist: true,
               id: artist?.user_id,
            }
            
         );
         // console.log(userArtist, "Soy linea 152")


         if (!userArtist) {
            return res.status(404).json({
               message: "Artist not found",
            });
         }

         const response = {
            ...artist,
            ...userArtist,
         }
         res.status(200).json(response);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting artist",
         });
      }
   }
}

