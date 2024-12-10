import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransportTypes {
  @PrimaryGeneratedColumn()
  transport_type_id: number;

  @Column({
    length: 50,
  })
  brand: string;

  @Column({
    length: 50,
  })
  transport_type: string;

  @Column("decimal", { precision: 10, scale: 2 })
  load_capacity: number;

  @Column()
  year_of_manufacture: number;

  @Column()
  num_repairs: number;
}