import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TransportTypes } from "../TransportTypes/TransportTypes";
import { CompanyEmployee } from "../companyemployees/CompanyEmployees";

@Entity()
export class TransportTrip {
  @PrimaryGeneratedColumn()
  trip_id: number;

  @Column({
    length: 255,
  })
  route_description: string;

  @Column()
  transport_type_id: number;

  @Column()
  driver1_employee_id: number;

  @Column()
  driver2_employee_id: number;

  @ManyToOne(() => TransportTypes, { cascade: true })
  @JoinColumn({ name: "transport_type_id" })
  transportType: TransportTypes;

  @ManyToOne(() => CompanyEmployee, { cascade: true })
  @JoinColumn({ name: "driver1_employee_id" })
  driver1: CompanyEmployee;

  @ManyToOne(() => CompanyEmployee, { cascade: true })
  @JoinColumn({ name: "driver2_employee_id" })
  driver2: CompanyEmployee;
}