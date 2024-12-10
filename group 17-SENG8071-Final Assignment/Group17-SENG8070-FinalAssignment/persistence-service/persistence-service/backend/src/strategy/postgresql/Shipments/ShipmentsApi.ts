import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { Shipment } from "./Shipments";
import { ShipmentDetailCustomer } from "../ShipmentDetailsCustomers/ShipmentDetailsCustomers";
import { DataConnector } from "../configure";

export default class ShipmentApi {
  #express: Express;
  #dataConnector: DataConnector<Shipment,Options>;

  constructor(dataConnector: DataConnector<Shipment,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;

    // Create
    this.#express.post("/shipment", async (req: Request, res: Response) => {
      const { body } = req;
      if (body != null){
      console.log(body);

      const shipment = new Shipment();
      shipment.customer_id = body.customer_id;
      shipment.destination_location = body.destination_location;

      try {
        await this.#dataConnector.save(shipment);
        res.status(200).json("Shipment has been created");
      } catch (err) {
        console.error(err);
        res.status(503).json("Shipment creation failed in db.");
      }
    }
    else
    {
        res.status(200).json({
            error: "Body cannot be null ",
          });  
          return;
    }
    });

    // Read
    this.#express.get("/shipment/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
        if (req.params.id != null)
       
        {
            try {
                const shipment = await this.#dataConnector.findOneOrFail(myOptions);
                res.status(200).json(shipment);
              } catch (err) {
                console.error(err);
                res.status(404).json("Shipment not found.");
              }
        }
        else 
        {
            res.status(400).json({ error: "Id Cannot be Null " });
            return;
        }        
        
      
    });

    // Update
    this.#express.put("/shipment/:id", async (req: Request, res: Response) => {
      const { body } = req;
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (req.params.id != null)
        {
      try {
        const shipment = await this.#dataConnector.findOneOrFail(myOptions);

        shipment.customer_id = body.customer_id;
        shipment.destination_location = body.destination_location;

        await this.#dataConnector.save(shipment);
        console.log(`Shipment has been updated with id: ${shipment.shipment_id}`);
        res.status(200).json("Shipment has been updated");
      } catch (err) {
        console.error(err);
        res.status(503).json("Shipment update failed in db.");
      }
    }
    else 
        {
            res.status(200).json({ error: "Id Cannot be Null " });
            return;
        } 
    });

    // Delete
    this.#express.delete("/shipment/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
        if (req.params.id != null)
        {
            try {
                const result = await this.#dataConnector.delete(myOptions);

                if (result.affected === 0) {
                res.status(404).json({ error: "Shipment not found." });
                } else {
                console.log(`Shipment has been deleted with id: ${req.params.id}`);
                res.status(200).json("Shipment has been deleted");
                }
            } catch (err) {
                console.error(err);
                res.status(503).json("Shipment deletion failed in db.");
            }
        }
      else 
        {
            res.status(200).json({ error: "Id Cannot be Null " });
            return;
        } 
    });
  }
}
interface Options
{
  id : number;
}