import { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import { TransportTrip } from "./TransportTrips";
import { DataConnector } from "../configure";


export default class TransportTripApi {

  #express: Express;
  #dataConnector: DataConnector<TransportTrip,Options>;

  constructor(dataConnector: DataConnector<TransportTrip,Options>, express: Express) {
    this.#dataConnector = dataConnector;
    this.#express = express;

    // Create
    this.#express.post("/transport-trip", async (req: Request, res: Response) => {
      const { body } = req.body;
      console.log(body);

      if (body == null) {
        res.status(200).json("Invalid parameters for creating a transport trip." );
        return;
      }

      const trip = new TransportTrip();

      trip.route_description = body.route_description;
      trip.transport_type_id = body.transport_type_id;
      trip.driver1_employee_id = body.driver1_employee_id;
      trip.driver2_employee_id = body.driver2_employee_id;

      try {
        await this.#dataConnector.save(trip);
        console.log(`Transport trip has been created with id: ${trip.trip_id}`);
        res.status(200).json("Transport trip has been created");
      } catch (err) {
        console.error(err);
        res.status(503).json("Transport trip creation failed in db.");
      }
    });

    // Read
    this.#express.get("/transport-trip/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      const tripId = parseInt(req.params.id);

      if (req.params.id == " ") {
        res.status(200).json({ error: "Invalid trip ID." });
        return;
      }

      try {
        const trip = await this.#dataConnector.findOneOrFail(myOptions);

        res.status(200).json(trip);
      } catch (err) {
        console.error(err);
        res.status(404).json("Transport trip not found.");
      }
    });

    // Update only route desicription
    this.#express.put("/transport-trip/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      const tripId = parseInt(req.params.id);
      const { body } = req.body;

      if (req.params.id == " " || body == null) {
        res.status(200).json({ error: "Invalid trip ID or parameters for updating a transport trip." });
        return;
      }

      try {
        const trip = await this.#dataConnector.findOneOrFail(myOptions);

        trip.route_description = body.route_description;
        
        await this.#dataConnector.save(trip);
        console.log(`Transport trip has been updated with id: ${trip.trip_id}`);
        res.status(200).json("Transport trip has been updated ");
      } catch (err) {
        console.error(err);
        res.status(503).json({
          error: "Transport trip update failed in db.",
        });
      }
    });

    // Delete
    this.#express.delete("/transport-trip/:id", async (req: Request, res: Response) => {
      const myOptions:Options = 
      {
        id : parseInt(req.params.id),
      }
      const tripId = parseInt(req.params.id);

      if (req.params.id== " ") {
        res.status(200).json("Invalid trip ID.");
        return;
      }

      try {
        const result = await this.#dataConnector.delete(myOptions);

        if (result.affected === 0) {
          res.status(404).json({ error: "Transport trip not found." });
        } else {
          console.log(`Transport trip has been deleted with id: ${tripId}`);
          res.status(200).json("Transport trip has been deleted");
        }
      } catch (err) {
        console.error(err);
        res.status(503).json("Transport trip deletion failed in db.");
      }
    });
  }
}
interface Options
{
  id : number;
}

