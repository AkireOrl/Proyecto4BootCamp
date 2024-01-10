import { faker } from "@faker-js/faker";
import { Appoinment } from "../../models/Appoinment";
import { BaseFactory } from "./BaseFactory";

export class AppointmentFactory extends BaseFactory<Appoinment> {
   protected generateSpecifics(appointment: Appoinment): Appoinment {
      appointment.date= faker.date.weekday(); 
      // appointment.hour = faker.()
      return appointment;
   }
}