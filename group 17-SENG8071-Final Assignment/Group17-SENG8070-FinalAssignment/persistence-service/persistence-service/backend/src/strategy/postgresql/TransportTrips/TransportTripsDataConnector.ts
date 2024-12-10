
import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { DataConnector } from "../configure";
import { TransportTrip } from "./TransportTrips";

interface Options
{
  id : number;
}
export class TransportRepairDatacConnector implements DataConnector <TransportTrip,Options>
{
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;
  }
  async findOneOrFail(options: Options):  Promise<TransportTrip>
  {
    const employee= await this.#dataSource.manager.findOneOrFail(TransportTrip, {
      where: {
        trip_id: options.id,
      },
    });
    
    return employee;
    

  }
  save: (entity: TransportTrip) => void;
  async delete (options: Options) 
  {
    
    const result = await this.#dataSource.manager.delete(TransportTrip, 
      {
        trip_id: options.id,
    });
    return result
  }
  
}