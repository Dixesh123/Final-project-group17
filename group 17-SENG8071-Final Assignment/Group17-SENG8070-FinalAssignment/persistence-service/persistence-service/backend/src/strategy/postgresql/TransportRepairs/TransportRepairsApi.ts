import { Express, Request, Response } from "express";
import { TransportRepair } from "./TransportRepairs";
import { DataConnector } from "../configure";


export default class TransportRepairApi {
  
  #express: Express;
  #dataConnector: DataConnector<TransportRepair,Options>;

  constructor(dataConnector: DataConnector<TransportRepair,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;
    // Create
    this.#express.post("/transport-repair", async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);
      if (body == null )
      {
        res.status(200).json("Transport repair body cannot be null.");
        return;
      }
      const repair = new TransportRepair();
      repair.transport_type_id = body.transport_type_id;
      repair.mechanic_employee_id = body.mechanic_employee_id;
      repair.estimated_repair_time_days = body.estimated_repair_time_days;
      repair.actual_repair_time_days = body.actual_repair_time_days;

      try {
        await this.#dataConnector.save(repair);
        console.log(`Transport repair has been created with id: ${repair.repair_id}`);
        res.status(200).json("Transport repair has been created");
      } catch (err) {
        console.error(err);
        res.status(503).json("Transport repair creation failed in db.");
      }
    });

    // Read
    this.#express.get("/transport-repair/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (req.params.id == " ")
      {
        res.status(200).json("Transport repair Id cannot be null." );
        return;
      }
      try {
        const repair = await this.#dataConnector.findOneOrFail(myOptions);
        res.status(200).json(repair);
      } catch (err) {
        console.error(err);
        res.status(404).json("Transport repair not found." );
      }
    });

    // Update only repair time 
    this.#express.put("/transport-repair/:id", async (req: Request, res: Response) => {
      const { body } = req;
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (req.params.id == " ")
      {
        res.status(200).json("Transport repair Id cannot be null." );
        return;
      }
      try {
        const repair = await this.#dataConnector.findOneOrFail(myOptions);
        repair.estimated_repair_time_days = body.estimated_repair_time_days;
        await this.#dataConnector.save(repair);
        console.log(`Transport repair has been updated with id: ${repair.repair_id}`);
        res.status(200).json("Transport repair has been updated");
      } catch (err) {
        console.error(err);
        res.status(503).json("Transport repair update failed in db.");
      }
    });

    // Delete
    this.#express.delete("/transport-repair/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (req.params.id == " ")
      {
        res.status(200).json("Transport repair Id cannot be null.");
        return;
      }
      try {
        const result = await this.#dataConnector.delete(myOptions);
        if (result.affected === 0) {
          res.status(404).json("Transport repair not found.");
        } else {
          res.status(200).json("Transport repair has been deleted");
        }
      } catch (err) {
        console.error(err);
        res.status(503).json("Transport repair deletion failed in db.");
      }
    });
  }
}
interface Options
{
  id : number;
}