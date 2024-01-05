import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appoinment } from "./Appoinment";


@Entity("users")
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column()
   username!: string;

   @Column()
   role_id!: number;

   @Column()
   photo!: string;

   @Column()
   password!: string;

   @Column()
   email!: string;

   @ManyToOne(() => Role, (role) => role.users)
   @JoinColumn ({name: "role_id"})
   role!: Role;

   @ManyToOne(() => Artist, (artist) => artist.users)
   @JoinColumn ({name: "artist_id"})
   artist!: Artist;

   @OneToMany(() => Appoinment, (appointment) => appointment.user_id)
    clientAppointments!: Appoinment[];




   //Faltan las columnas
}
