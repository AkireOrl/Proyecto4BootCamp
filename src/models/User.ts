import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appoinment } from "./Appoinment";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    role_id!: string;
    

    @Column()
    photo!: string;

    @Column()
    password_hash!: string;

    @Column({ unique: true })
    email!: string;

    
    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
       name: "users_roles",
       joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "role_id",
          referencedColumnName: "id",
       },
    })
    roles!: Role[];

    @OneToOne(() => Artist, (artist) => artist.users)
    artist?: Artist;

    @OneToMany(() => Appoinment, (appointment) => appointment.user_id)
    clientAppointments!: Appoinment[];

}
