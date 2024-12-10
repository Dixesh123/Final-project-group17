import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { TransportTypes } from "./TransportTypes";
import { DataConnector } from "../configure";

export default class TransportTypeApi {
  
  #express: Express;
  #dataConnector: DataConnector<TransportTypes,Options>;

  constructor(dataConnector: DataConnector<TransportTypes,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;
    // defining CRUD Operations
    // Create
    this.#express.post("/transport-type", async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);

      const transportType = new TransportTypes();
      if ( body.brand != "" && 
           body.transport_type != "" &&
           body.load_capacity != "" &&
           body.year_of_manufacture != "" &&
           body.num_repairs!= "" )
        {
            transportType.brand = body.brand;
            transportType.transport_type = body.transport_type;
            transportType.load_capacity = body.load_capacity;
            transportType.year_of_manufacture = body.year_of_manufacture;
            transportType.num_repairs = body.num_repairs;
            try {
                await this.#dataConnector.save(transportType);
                console.log(`Transport type has been created with id: ${transportType.transport_type_id}`);
                res.status(200).json("Transport type has been created");
              } catch (err) {
                console.error(err);
                res.status(503).json("Transport type creation failed in db.");
              }
        }
      
    else
    {
        res.status(200).json({
            error: "Transport type body all value mandatory",
          });
    }
      
    });

    // Read
    this.#express.get("/transport-type/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
        if (req.params.id != " ")
        {
            try {
                const transportType = await this.#dataConnector.findOneOrFail(myOptions);
                res.status(200).json(transportType);
              } catch (err) {
                console.error(err);
                res.status(404).json("Transport type not found." );
              }
        }
        else
        {
            res.status(200).json("Transport type ID cannot be null");
        }
     
    });

    // Update only brand column
    this.#express.put("/transport-type/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      const { body } = req.body;
      if (req.params.id != " " && req.body.brand != null)
      {
        try {
            const transportType = await this.#dataConnector.findOneOrFail(myOptions);
    
            transportType.brand = body.brand;
            await this.#dataConnector.save(transportType);
            console.log(`Transport type has been updated with id: ${transportType.transport_type_id}`);
            res.status(200).json({ transport_type_id: transportType.transport_type_id });
          } catch (err) {
            console.error(err);
            res.status(400).json({
              error: "Transport type update failed in db.",
            });
          }
      }
      else 
      {
        res.status(200).json({
            error: "Transport type ID cannot be null",
          });
      }
    });

    // Delete
    this.#express.delete("/transport-type/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
        if (req.params.id != " ")
        {
            try {
                const result = await this.#dataConnector.delete(myOptions);
        
                if (result.affected === 0) {
                  res.status(404).json({ error: "Transport type not found." });
                } else {
                  console.log(`Transport type has been deleted with id: ${req.params.id}`);
                  res.status(200).json("Transport type has been deleted");
                }
              } catch (err) {
                console.error(err);
                res.status(503).json("Transport type deletion failed in db.");
              }
        }
      else 
      {
        res.status(200).json({
            error: "Transport type ID cannot be null.",
          });
      }
    });
  }
}
interface Options
{
  id : number;
}
