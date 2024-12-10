
import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { CompanyEmployee } from "./CompanyEmployees";
import { DataConnector } from "../configure";
interface Options
{
  id : number;
}
export class CompanyEmployeeApiDataConnector implements DataConnector <CompanyEmployee,Options>
{
  #dataSource: DataSource;
  #express: Express;

  constructor(dataSource: DataSource, express: Express) {
    this.#dataSource = dataSource;
    this.#express = express;
  }
  async findOneOrFail(options: Options):  Promise<CompanyEmployee>
  {
    const employee= await this.#dataSource.manager.findOneOrFail(CompanyEmployee, {
      where: {
        employee_id: options.id,
      },
    });
    
    return employee;
    

  }
  save: (entity: CompanyEmployee) => void;
  async delete (options: Options) 
  {
    
    const result = await this.#dataSource.manager.delete(CompanyEmployee, 
      {
      employee_id: options.id,
    });
    return result
  }
  
}