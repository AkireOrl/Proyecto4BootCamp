import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { User } from "./User";
import { Artist } from "./Artist";

@Entity()
export class Appoinment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: string;

    @Column()
    artist_id!: string;

    @Column()
    date!: string;

    @Column()
    hour!: string;

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @ManyToOne(() => User, (user) => user.role)
    @JoinColumn ({name: "user_id"})
    user!: User;

    @ManyToOne(() => Artist, (artist) => artist.users)
    @JoinColumn ({name: "artist_id"})
    artist!: Artist;

}
