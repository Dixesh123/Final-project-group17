import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";
import { CompanyEmployee } from "./CompanyEmployees";
import { DataConnector } from "../configure";


export default class CompanyEmployeeApi {
  #express: Express;
  #dataConnector: DataConnector<CompanyEmployee,Options>;

  constructor(dataConnector: DataConnector<CompanyEmployee,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;

    // Create
    this.#express.post("/company-employee", async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);

      if (req.body == null) {
        res.status(400).json({ error: "Invalid request parameters." });
        return;
      }

      const employee = new CompanyEmployee();

      employee.first_name = body.first_name;
      employee.last_name = body.last_name;
      employee.years_of_service = body.years_of_service;
      employee.is_mechanic = body.is_mechanic;
      employee.transport_type_name = body.transport_type_name;

      try {
        await this.#dataConnector.save(employee);
        res.status(200).json("Company employee has been created");
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Company employee creation failed in db.",
        });
      }
    });

    // Read
    this.#express.get("/company-employee/:id", async (req: Request, res: Response) => {
      const employeeId= parseInt(req.params.id);
      if (req.params.id == " ") 
      {
        res.status(200).json("Employe Id does Not exists");
        return;
      }
      else{
        
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      try {
        const employee= await this.#dataConnector.findOneOrFail(myOptions);
        console.log(employee);
        res.status(200).json(employee);
      } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Company employee not found." });
      }}
    });

    // Update only years of service
    this.#express.put("/company-employee/:id", async (req: Request, res: Response) => {
      const employeeId = parseInt(req.params.id);
      const { body } = req;
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (isNaN(employeeId)|| !req.body.years_of_service ) {
        res.status(200).json( "Invalid employee ID or request body years of service." );
        return;
      }
      try {
        const employee = await this.#dataConnector.findOneOrFail(myOptions)
        console.log(employee);
        employee.years_of_service = body.years_of_service;
        await this.#dataConnector.save(employee);
        res.status(200).json("Company employee has been updated ");
      } catch (err) {
        console.error(err);
        res.status(200).json("Company employee update failed in db.");
      }
    });

    // Delete
    this.#express.delete("/company-employee/:id", async (req: Request, res: Response) => {
      const employeeId = parseInt(req.params.id);
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (!employeeId) {
        res.status(200).json("Invalid employee ID." );
        return;
      }

      try {
        const result = await this.#dataConnector.delete(myOptions)
        if (result.affected === 0) {
          res.status(200).json({ error: "Company employee not found." });
        } else {
          res.status(200).json("Company employee has been deleted ");
        }
      } catch (err) {
        console.error(err);
        res.status(200).json({
          error: "Company employee deletion failed in db.",
        });
      }
    });
  }
}

interface Options
{
  id : number;
}