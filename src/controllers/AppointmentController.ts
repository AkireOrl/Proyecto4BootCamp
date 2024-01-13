import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
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
            con