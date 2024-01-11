import { faker } from "@faker-js/faker";
import { Appoinment } from "../../models/Appoinment";
import { BaseFactory } from "./BaseFactory";

export class AppointmentFactory extends BaseFactory<Appoinment> {
   protected generateSpecifics(appointment: Appoinment): Appoinment {
      appointment.hour= faker.string.alpha();
      appointment.date= faker.date.weekday();
      return appointment;
   }
}