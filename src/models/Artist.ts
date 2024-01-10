import { BaseEntity, Entity, PrimaryGeneratedColumn, Column , OneToMany, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";
import { Design } from "./Design";
import { Appoinment } from "./Appoinment";
import { UserRoles } from "../constants/UserRoles";
@Entity("artist")
export class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column()
    name!: string;

    @Column()
    surname!: string;

    @Column()
    portfolio!: string;

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToOne(() => User, (user) => user.artist)
    @JoinColumn({name: "user_id"})
    users!: User;

    @OneToMany(() => Design, (design) => design)
    design!: Design[];

    @OneToMany(() => Appoinment, (appointment) => appointment.artist)
    clientAppointments!: Appoinment[];

}
