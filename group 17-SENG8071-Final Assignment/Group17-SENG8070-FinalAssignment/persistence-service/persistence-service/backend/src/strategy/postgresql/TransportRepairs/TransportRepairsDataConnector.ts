
import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { TransportRepair } from "./TransportRepairs";
import { DataConnector } from "../configure";

interface Options
{
  id : number;
}
export class TransportRepairDataConnector implements DataConnector <TransportRepair,Options>
{
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;
  }
  async findOneOrFail(options: Options):  Promise<TransportRepair>
  {
    const employee= await this.#dataSource.manager.findOneOrFail(TransportRepair, {
      where: {
        repair_id: options.id,
      },
    });
    
    return employee;
    

  }
  save: (entity: TransportRepair) => void;
  async delete (options: Options) 
  {
    
    const result = await this.#dataSource.manager.delete(TransportRepair, 
      {
        repair_id: options.id,
    });
    return result
  }
  
}