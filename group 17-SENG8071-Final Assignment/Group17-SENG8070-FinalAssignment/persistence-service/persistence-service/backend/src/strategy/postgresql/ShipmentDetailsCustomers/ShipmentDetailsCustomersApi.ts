import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { ShipmentDetailCustomer } from "./ShipmentDetailsCustomers";
import { DataConnector } from "../configure";

export default class ShipmentDetailCustomerApi {
  #express: Express;
  #dataConnector: DataConnector<ShipmentDetailCustomer,Options>;

  constructor(dataConnector: DataConnector<ShipmentDetailCustomer,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;
    // Create
    this.#express.post("/shipment-detail-customer", async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);
        if (body != null)
        {
            const customer = new ShipmentDetailCustomer();
            customer.customer_name = body.customer_name;
            customer.customer_address = body.customer_address;
            customer.phone_number1 = body.phone_number1 || null;
            customer.phone_number2 = body.phone_number2 || null;
            try {
              await this.#dataConnector.save(customer);
                console.log(`Shipment detail customer has been created with id: ${customer.customer_id}`);
                res.status(200).json("Shipment detail customer has been created");
            } catch (err) {
                console.error(err);
                res.status(503).json({
                error: "Shipment detail customer creation failed in db.",
                });
            }
        }
      else 
      {
        res.status(200).json({
            error: "Body cannot be Null.",
            });
            return;
      }

      
    });

    // Read
    this.#express.get("/shipment-detail-customer/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
        if (req.params.id != null){
            try {
                const customer = await this.#dataConnector.findOneOrFail(myOptions);

                res.status(200).json(customer);
            } catch (err) {
                console.error(err);
                res.status(404).json({ error: "Shipment detail customer not found." });
            }
        }
      else
      {
        res.status(200).json({ error: "Id Cannot be Null." });
        return;
      }
    });

    // Update Only Name column
    this.#express.put("/shipment-detail-customer/:id", async (req: Request, res: Response) => {
      const { body } = req;
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (req.params.id != null)
      {
        try {
            const customer = await this.#dataConnector.findOneOrFail(myOptions);

            customer.customer_name = body.customer_name;
            await this.#dataConnector.save(customer);
            res.status(200).json("Shipment detail customer has been updated");
        } catch (err) {
            console.error(err);
            res.status(503).json({
            error: "Shipment detail customer update failed in db.",
            });
        }
      }
      else 
      {
        res.status(200).json({
            error: "Id Cannot be null",
            });
            return;
      }
    });

    // Delete
    this.#express.delete("/shipment-detail-customer/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }  
      if (req.params.id != null)
        
      {
      try {
        const result = await this.#dataConnector.delete(myOptions); 

        if (result.affected === 0) {
          res.status(404).json("Shipment detail customer not found." );
        } else {
          console.log(`Shipment detail customer has been deleted with id: ${req.params.id}`);
          res.status(200).json("Shipment detail customer has been deleted");
        }
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Shipment detail customer deletion failed in db.",
        });
      }}
      else 
      {
        res.status(200).json({
            error: "Id Cannot be null",
            });
            return;
      }
    });
  }
}
interface Options
{
  id : number;
}
