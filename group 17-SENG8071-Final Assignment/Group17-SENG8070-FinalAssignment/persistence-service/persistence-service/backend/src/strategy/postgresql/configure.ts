import { DataSource, DeleteResult } from "typeorm";
import { CompanyEmployee } from "./companyemployees/CompanyEmployees";
import { TransportTypes } from "./TransportTypes/TransportTypes"; 
import { EmployeeTransportRelationship } from "./employeetransportrelationship/employeetransportrelationship";
import { ShipmentDetailCustomer } from "./ShipmentDetailsCustomers/ShipmentDetailsCustomers";
import { Shipment } from "./Shipments/Shipments";
import { TransportRepair } from "./TransportRepairs/TransportRepairs";
import { TransportTrip } from "./TransportTrips/TransportTrips";
import { TripShipment } from "./TripShipments/TripShipments";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [CompanyEmployee,TransportTypes,EmployeeTransportRelationship,ShipmentDetailCustomer,Shipment,TransportRepair,TransportTrip,TripShipment],
  synchronize: true,
  logging: false,
});


export interface DataConnector <T, R>
{

  findOneOrFail:(options: R) => Promise<T>;
  save: (entity : T)=> void;
  delete: (options: R) => Promise<DeleteResult>;
}
