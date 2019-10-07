import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table({
    timestamps: true,
    underscored: true,
    tableName: "users",
})
export class Users extends Model<Users> {
    @Column
    name !: string;

    @Column
    email !: string;

    @Column
    password !: string;

    @Column
    status !: string;
}