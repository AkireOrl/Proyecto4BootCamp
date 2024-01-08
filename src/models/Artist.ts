import { BaseEntity, Entity, PrimaryGeneratedColumn, Column , OneToMany } from "typeorm"
import { User } from "./User";
import { Design } from "./Design";
import { Appoinment } from "./Appoinment";

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

    @OneToMany(() => User, (user) => user.role)
    users!: User[];

    @OneToMany(() => Design, (design) => design)
    design!: Design[];

    @OneToMany(() => Appoinment, (appointment) => appointment.artist)
    clientAppointments!: Appoinment[];

}
