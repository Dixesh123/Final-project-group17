import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShipmentDetailCustomer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({
    length: 100,
  })
  customer_name: string;

  @Column({
    length: 255,
  })
  customer_address: string;

  @Column({
    length: 15,
    nullable: true,
  })
  phone_number1: string;

  @Column({
    length: 15,
    nullable: true,
  })
  phone_number2: string ;
}