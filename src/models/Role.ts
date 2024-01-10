import { Column, Entity, PrimaryGeneratedColumn,ManyToMany, JoinTable } from "typeorm"
import { User } from "./User";
@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: string

    @Column()
    created_at!: Date

    @Column()
    updated_at!: Date

    @ManyToMany(() => User, (user) => user.roles)
    @JoinTable({
       name: "users_roles",
       joinColumn: {
          name: "role_id",
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "user_id",
          referencedColumnName: "id",
       },
    })
    users?: User[];
 }
