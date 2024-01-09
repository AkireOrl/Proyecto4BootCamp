import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appoinment } from "./Appoinment";
import { UserRoles } from "../constants/UserRoles";


@Entity("users")
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   username!: string;

   @Column()
   name!: string;

   @Column()
   surname!: string;

   @Column()
   role_id!: number;

   @Column()
   photo!: string;

   @Column()
   password_hash!: string;

   @Column()
   email!: string;

   @ManyToOne(() => Role, (role) => role.users)
   @JoinColumn ({name: "role_id"})
   role!: Role[];

   @OneToOne(() => Artist, (artist) => artist.users)
   artist?: Artist;

   @OneToMany(() => Appoinment, (appointment) => appointment.user_id)
    clientAppointments!: Appoinment[];


}
