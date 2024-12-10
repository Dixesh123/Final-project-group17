
import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { Shipment } from "./Shipments";
import { DataConnector } from "../configure";

interface Options
{
  id : number;
}
export class ShipmentCustomersDataConnector implements DataConnector <Shipment,Options>
{
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;
  }
  async findOneOrFail(options: Options):  Promise<Shipment>
  {
    const employee= await this.#dataSource.manager.findOneOrFail(Shipment, {
      where: {
        shipment_id: options.id,
      },
    });
    
    return employee;
    

  }
  save: (entity: Shipment) => void;
  async delete (options: Options) 
  {
    
    const result = await this.#dataSource.manager.delete(Shipment, 
      {
        shipment_id: options.id,
    });
    return result
  }
  
}