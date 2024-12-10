import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ShipmentDetailCustomer } from "../ShipmentDetailsCustomers/ShipmentDetailsCustomers";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  shipment_id: number;

  @Column()
  customer_id: number;

  @Column({
    length: 255,
  })
  destination_location: string;

  @ManyToOne(() => ShipmentDetailCustomer, { cascade: true })
  @JoinColumn({ name: "customer_id" })
  customer: ShipmentDetailCustomer;
}