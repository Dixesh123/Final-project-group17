import cors from "cors";
import express, { json, Request, Response } from "express";
import postgresDataSource from "./strategy/postgresql";
import CompanyEmployeesApi from "./strategy/postgresql/companyemployees/CompanyEmployeesApi";
import { CompanyEmployeeApiDataConnector } from "./strategy/postgresql/companyemployees/CompanyEmployeeApiDataConnector";
import { EmployeeTransportrelationshipDataConnector } from "./strategy/postgresql/employeetransportrelationship/EmployeeTransportrelationshipDataConnector";
import { ShipmentDetailsCustomersDataConnector } from "./strategy/postgresql/ShipmentDetailsCustomers/ShipmentDetailsCustomersDataConnector";
import { TransportRepairDataConnector } from "./strategy/postgresql/TransportRepairs/TransportRepairsDataConnector";
import { ShipmentCustomersDataConnector } from "./strategy/postgresql/Shipments/ShipmentsDataConnector";
import { TransportRepairDatacConnector } from "./strategy/postgresql/TransportTrips/TransportTripsDataConnector";
import { TransportTypesDataConnector } from "./strategy/postgresql/TransportTypes/TransportTypesDataConnector";
import { TripShipmentDataConnectorDataConnector } from "./strategy/postgresql/TripShipments/TripShipmentsDataConnetor";
import EmployeeTransportRelationshipApi from "./strategy/postgresql/employeetransportrelationship/EmployeeTransportRelationshipApi";
import ShipmentDetailCustomerApi from "./strategy/postgresql/ShipmentDetailsCustomers/ShipmentDetailsCustomersApi";
import ShipmentApi from "./strategy/postgresql/Shipments/ShipmentsApi";
import TransportRepairApi from "./strategy/postgresql/TransportRepairs/TransportRepairsApi";
import TransportTripApi from "./strategy/postgresql/TransportTrips/TransportTripsApi";
import TransportTypeApi from "./strategy/postgresql/TransportTypes/TransportTypesApi";
import TripShipmentApi from "./strategy/postgresql/TripShipments/TripShipmentsApi";

(async () => {
    const app = express();
    app.use(cors());
    app.use(json());

    console.log("Initializing PostgreSQL DataSource...");
    const datasource = await postgresDataSource.initialize();

    console.log("Initializing Data Connectors and APIs...");
    const companydataconnector = new CompanyEmployeeApiDataConnector(datasource, app);
    const employeetransportdataconnector = new EmployeeTransportrelationshipDataConnector(datasource, app);
    const shipmentdetailsdataconnector = new ShipmentDetailsCustomersDataConnector(datasource, app);
    const shipmentdataconnector = new ShipmentCustomersDataConnector(datasource, app);
    const transportRepairdataconnector = new TransportRepairDataConnector(datasource, app);
    const transporttripdataconnector = new TransportRepairDatacConnector(datasource, app);
    const transporttypedataconnector = new TransportTypesDataConnector(datasource, app);
    const tripshipmentdataconnector = new TripShipmentDataConnectorDataConnector(datasource, app);

    new CompanyEmployeesApi(companydataconnector, app);
    new EmployeeTransportRelationshipApi(employeetransportdataconnector, app);
    new ShipmentDetailCustomerApi(shipmentdetailsdataconnector, app);
    new ShipmentApi(shipmentdataconnector, app);
    new TransportRepairApi(transportRepairdataconnector, app);
    new TransportTripApi(transporttripdataconnector, app);
    new TransportTypeApi(transporttypedataconnector, app);
    new TripShipmentApi(tripshipmentdataconnector, app);

    // Test Route
    app.get("/", (_, res: Response) => {
        console.log("Root endpoint accessed.");
        return res.send("Database Testing");
    });

    // Sample Employees Endpoint for Debugging
    app.get("/api/employees", (req: Request, res: Response) => {
        console.log("GET /api/employees route called");
        const sampleEmployees = [
            { id: 1, name: "John Doe", seniority: 5 },
            { id: 2, name: "Jane Smith", seniority: 3 },
        ];
        return res.status(200).json(sampleEmployees);
    });

    // Explicitly convert PORT to a number
    const PORT = Number(process.env.PORT) || 8000;
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Express server started on port ${PORT}`);
    });
})().catch((err) => {
    console.error("Error starting server:", err);
});