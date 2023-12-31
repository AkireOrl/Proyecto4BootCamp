import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,OneToMany, JoinColumn } from "typeorm"
import { User } from "./User";
@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @OneToMany(() => User, (user) => user.role)
    @JoinColumn({
        name: "user_role",
        referencedColumnName: "id"
    })
    users!: User[];

}
