import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TransportTypes } from "../TransportTypes/TransportTypes";

@Entity()
export class CompanyEmployee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column({
    length: 50,
  })
  first_name: string;

  @Column({
    length: 50,
  })
  last_name: string;

  @Column()
  years_of_service: number;

  @Column()
  is_mechanic: boolean;

  @Column()
  transport_type_name: string;

  @ManyToOne(() => TransportTypes, { cascade: true })
  @JoinColumn({ name: "transport_type_name" })
  transportType: TransportTypes;
}