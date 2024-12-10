
import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { DataConnector } from "../configure";
import { TransportTypes } from "./TransportTypes";

interface Options
{
  id : number;
}
export class  TransportTypesDataConnector implements DataConnector <TransportTypes,Options>
{
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;
  }
  async findOneOrFail(options: Options):  Promise<TransportTypes>
  {
    const employee= await this.#dataSource.manager.findOneOrFail(TransportTypes, {
      where: {
        transport_type_id: options.id,
      },
    });
    
    return employee;
    

  }
  save: (entity: TransportTypes) => void;
  async delete (options: Options) 
  {
    
    const result = await this.#dataSource.manager.delete(TransportTypes, 
      {
        transport_type_id: options.id,
    });
    return result
  }
  
}