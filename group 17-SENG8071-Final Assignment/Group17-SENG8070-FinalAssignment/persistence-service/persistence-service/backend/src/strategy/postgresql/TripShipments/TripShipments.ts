import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { TransportTrip } from "../TransportTrips/TransportTrips";
import { Shipment } from "../Shipments/Shipments";

@Entity()
export class TripShipment {
  @PrimaryGeneratedColumn()
  trip_shipment_id: number;

  @Column()
  trip_id: number;

  @Column()
  shipment_id: number;

  @ManyToOne(() => TransportTrip, { cascade: true })
  @JoinColumn({ name: "trip_id" })
  transportTrip: TransportTrip;

  @ManyToOne(() => Shipment, { cascade: true })
  @JoinColumn({ name: "shipment_id" })
  shipment: Shipment;
}