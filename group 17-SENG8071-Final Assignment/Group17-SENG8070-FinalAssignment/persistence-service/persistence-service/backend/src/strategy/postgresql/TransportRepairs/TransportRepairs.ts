import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TransportTypes } from "../TransportTypes/TransportTypes";
import { CompanyEmployee } from "../companyemployees/CompanyEmployees";

@Entity()
export class TransportRepair {
  @PrimaryGeneratedColumn()
  repair_id: number;

  @Column()
  transport_type_id: number;

  @Column()
  mechanic_employee_id: number;

  @Column()
  estimated_repair_time_days: number;

  @Column()
  actual_repair_time_days: number;

  @ManyToOne(() => TransportTypes, { cascade: true })
  @JoinColumn({ name: "transport_type_id" })
  transportType: TransportTypes;

  @ManyToOne(() => CompanyEmployee, { cascade: true })
  @JoinColumn({ name: "mechanic_employee_id" })
  mechanic: CompanyEmployee;
}