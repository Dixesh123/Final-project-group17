import { Express, Request, Response } from "express";
import { TripShipment } from "./TripShipments";
import { DataConnector } from "../configure";


export default class TripShipmentApi {

  #express: Express;
  #dataConnector: DataConnector<TripShipment,Options>;

  constructor(dataConnector: DataConnector<TripShipment,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;

    // Create
    this.#express.post("/trip-shipment", async (req: Request, res: Response) => {
      const { body } = req;
      console.log(body);

      if (!body.trip_id || !body.shipment_id) {
        res.status(200).json({ error: "Invalid request parameters." });
        return;
      }

      const tripShipment = new TripShipment();

      tripShipment.trip_id = body.trip_id;
      tripShipment.shipment_id = body.shipment_id;

      try {
        await this.#dataConnector.save(tripShipment);
        console.log(`Trip shipment has been created with id: ${tripShipment.trip_shipment_id}`);
        res.status(200).json({ trip_shipment_id: tripShipment.trip_shipment_id });
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Trip shipment creation failed in db.",
        });
      }
    });

    // Read
    this.#express.get("/trip-shipment/:id", async (req: Request, res: Response) => {
      const tripShipmentId = parseInt(req.params.id);
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      if (req.params.id == " ") {
        res.status(200).json({ error: "Invalid trip shipment ID." });
        return;
      }

      try {
        const tripShipment = await this.#dataConnector.findOneOrFail(myOptions);

        res.status(200).json(tripShipment);
      } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Trip shipment not found." });
      }
    });

    // Update
    this.#express.put("/trip-shipment/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      const tripShipmentId = parseInt(req.params.id);

      if (req.params.id == " " || !req.body) {
        res.status(400).json({ error: "Invalid trip shipment ID or request body." });
        return;
      }

      const { body } = req.body;
      try {
        const tripShipment = await this.#dataConnector.findOneOrFail(myOptions);

        if (!body.trip_id || !body.shipment_id) {
          res.status(200).json({ error: "Invalid request parameters." });
          return;
        }

        tripShipment.trip_id = body.trip_id;
        tripShipment.shipment_id = body.shipment_id;

        await this.#dataConnector.save(tripShipment);
        console.log(`Trip shipment has been updated with id: ${tripShipment.trip_shipment_id}`);
        res.status(200).json({ trip_shipment_id: tripShipment.trip_shipment_id });
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Trip shipment update failed in db.",
        });
      }
    });

    // Delete
    this.#express.delete("/trip-shipment/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      const tripShipmentId = parseInt(req.params.id);

      if (req.params.id == " ") {
        res.status(200).json({ error: "Invalid trip shipment ID." });
        return;
      }

      try {
        const result = await this.#dataConnector.delete(myOptions);

        if (result.affected === 0) {
          res.status(404).json({ error: "Trip shipment not found." });
        } else {
          console.log(`Trip shipment has been deleted with id: ${tripShipmentId}`);
          res.status(200).json({ success: true });
        }
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Trip shipment deletion failed in db.",
        });
      }
    });
  }
}
interface Options
{
  id : number;
}