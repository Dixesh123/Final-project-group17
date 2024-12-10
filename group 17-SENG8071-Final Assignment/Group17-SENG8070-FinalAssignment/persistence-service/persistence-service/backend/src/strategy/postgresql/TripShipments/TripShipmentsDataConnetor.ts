
import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { DataConnector } from "../configure";
import { TripShipment } from "./TripShipments";

interface Options
{
  id : number;
}
export class TripShipmentDataConnectorDataConnector implements DataConnector <TripShipment,Options>
{
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;
  }
  async findOneOrFail(options: Options):  Promise<TripShipment>
  {
    const employee= await this.#dataSource.manager.findOneOrFail(TripShipment, {
      where: {
        trip_shipment_id: options.id,
      },
    });
    
    return employee;
    

  }
  save: (entity: TripShipment) => void;
  async delete (options: Options) 
  {
    
    const result = await this.#dataSource.manager.delete(TripShipment, 
      {
        trip_shipment_id: options.id,
    });
    return result
  }
  
}