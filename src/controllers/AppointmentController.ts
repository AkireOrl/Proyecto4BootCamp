import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { AppDataSource } from "../database/data-source";
import { Controller } from "./Controller";


//----------------------------------------------------------------------

export class AppointmentController implements Controller {
    async getAll(req: Request, res: Response): Promise<void | Response<any>> {
       try {
        const appointmentRepository = AppDataSource.getRepository(Appointment);

        const allAppointment = await appointmentRepository.find();
        return res.status(200).json(allAppointment);
       }catch (error){
        res.status(500).json({
            message: "Error while getting appointments",
        });
       }
    }

    async getById(req: Request, res: Response): Promise<void | Response<any>> {
        try {
            const id = +req.params.id;
            const appointmentRepository = AppDataSource.getRepository(Appointment);
            const appointments = await appointmentRepository.findOneBy({
               id: id,
            });

            if (!appointments) {
                return res.status(404).json({
                   message: "Appointment not found",
                });
             }
    
             res.status(200).json(appointments);
          } catch (error) {
             res.status(500).json({
                message: "Error while getting appointments",
             });
          }
       }
       async create(req: Request, res: Response): Promise<void | Response<any>> {
        try {
           const data = req.body;
  
           const userRepository = AppDataSource.getRepository(Appointment);
           const newAppointment = await userRepository.save(data);
           res.status(201).json(newAppointment);
        } catch (error) {
           res.status(500).json({
              message: "Error while creating appointment",
           });
        }
     }
     async update(req: Request, res: Response): Promise<void | Response<any>> {
        try {
           const id = +req.params.id;
           const data = req.body;
  
           const appointmentRepository = AppDataSource.getRepository(Appointment);
           const appointmentUpdated = await appointmentRepository.update({ id: id }, data);
           res.status(202).json({
              message: "Appointment updated successfully",
           });
        } catch (error) {
           res.status(500).json({
              message: "Error while updating appointment",
           });
        }
     }
     async delete(req: Request, res: Response): Promise<void | Response<any>> {
        try {
           const id = +req.params.id;
  
           const appointmentRepository = AppDataSource.getRepository(Appointment);
           await appointmentRepository.delete(id);
  
           res.status(200).json({
              message: "Appointment deleted successfully",
           });
        } catch (error) {
           res.status(500).json({
              message: "Error while deleting appointment",
           });
        }
     }
  }