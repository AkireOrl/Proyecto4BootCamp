import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import {
   CreateUserRequestBody,
   LoginUserRequestBody,
   TokenData,
} from "../types/types";
import { UserRoles } from "../constants/UserRoles";
import { AuthController } from "./AuthController";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Filter } from "typeorm";

// -----------------------------------------------------------------------------

export class UserController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userRepository = AppDataSource.getRepository(User);

         const page = req.query.page  ? Number(req.query.page) : null;
         const limit = req.query.limit ? Number(req.query.limit) : null;


         interface filter {
            [key: string]: any;
         }
         const filter: filter = {
            select: {
               username: true,
               email: true,
               id: true,
            },
         };

         if (page && limit ) {
            filter.skip = ((page- 1) * limit)

         }
         if (limit) {
            filter.take = (limit)
         }

         const [allUsers, count] = await userRepository.findAndCount(
            filter
         );
         res.status(200).json({
            count,
            limit,
            page,
            results: allUsers,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
   }


   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         const user = await userRepository.findOneBy({
            id: id,
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting user del getbyId",
         });
      }
   }

   async create(
      req: Request<{}, {}, CreateUserRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, name, surname, password_hash, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      try {
         // Crear nuevo usuario
         const newUser: User = {
            username,
            name,
            surname,
            email,
            password_hash: bcrypt.hashSync(password_hash, 10),
            roles: [UserRoles.USER],
         };
         await userRepository.save(newUser);


         res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
         });
      } catch (error: any) {
         console.error("Error while creating User:", error);
         res.status(500).json({
            message: "Error while creating User",
            error: error.message,
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         const userUpdated = await userRepository.update({ id: id }, data);
         res.status(202).json({
            message: "User updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating user",
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         await userRepository.delete(id);
         // const roleRepository = AppDataSource.getRepository();
         // await roleRepository.deleteRolesFromUserId(id);


         res.status(200).json({
            message: "User deleted successfully",
         });
      } catch (error: any) {
         console.error("Error while delete users:", error);
         res.status(500).json({
            message: "Error while delete users",
            error: error.message,
         });
      }
   }
   async userProfile(req: Request, res: Response): Promise<Response<any>> {
      try {
        const email = req.tokenData.email;
        const userRepository = AppDataSource.getRepository(User);
        const profileUser = await userRepository.findOneBy({ 
            email
         })
    
        if (!profileUser) {
          return res.status(404).json({ message: 'Profile not found' });
        } else {
         //  const { id, name, email } = profileUser;
          return res.status(200).json({ profileUser});
        }
      } catch (err) {
        console.error('Error in the profile controller', err);
        return res.status(401).json({ status: 'Error', message: 'Not authorized.' });
      }
    }
}
