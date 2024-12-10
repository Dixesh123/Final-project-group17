import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

// Unit test case for get 

describe("Get Trip Shipment by id", () => {
    it("returns Trip Shipment/:id", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/trip-shipment/1').reply(200, {trip_shipment_id: 1});
        const response = await axios.get("http://localhost:8000/trip-shipment/1");
        const employeeDetails = response.data;
        expect(employeeDetails.trip_shipment_id).toBe(1);
    });
  });

  describe("Get Trip Shipment Details by InvalidID But does not exist in records", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/trip-shipment/ ').reply(200, "Trip Shipment not found.");
       const response = await axios.get("http://localhost:8000/trip-shipment/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Trip Shipment not found.");
    });
  });

  describe("Update Trip Shipment by id", () => {
    it("returns Updated Trip Shipment id", async () => {
        const mock = new MockAdapter(axios);
        const requestBody = {
          transport_type_id : 2
        };
        mock.onPut(`http://localhost:8000/trip-shipment/1`).reply(200, "Trip Shipment has been updated" );
        const response = await axios.put("http://localhost:8000/trip-shipment/1",requestBody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Trip Shipment has been updated");
        });
  });

  describe("Update Trip Shipment by id by InvalidID type", () => {
    it("return error mesage ", async () => {
       const mock = new MockAdapter(axios);
       mock.onPut(`http://localhost:8000/trip-shipment/1`).reply(200, "Trip Shipment update failed in db.");
       const response = await axios.put("http://localhost:8000/trip-shipment/1");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Trip Shipment update failed in db.");
      
    });
  });

  describe("Delete Trip Shipment by ID", () => {
    it("returns Delete Trip Shipment details", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/trip-shipment/1`).reply(200, "Trip Shipment has been deleted");
        const response = await axios.delete("http://localhost:8000/trip-shipment/1");
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Trip Shipment has been deleted");
    });
  });

  describe("delete Trip Shipment details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/trip-shipment/ `).reply(200, "Trip Shipment deletion failed in db.");
       const response = await axios.delete("http://localhost:8000/trip-shipment/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Trip Shipment deletion failed in db.");
    });
  });

  describe("Create a Trip Shipment ", () => {
    it("returns create a new Trip Shipment", async () => {
        const mock = new MockAdapter(axios);
        const requestbody =  {
          employee_id :6,
          transport_type_id:6
        };
        mock.onPost(`http://localhost:8000/trip-shipment`,requestbody).reply(200, "Trip Shipment has been created");
        const response = await axios.post("http://localhost:8000/trip-shipment",requestbody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Trip Shipment has been created");
    });
  });

  describe("create Trip Shipment by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody = null;
        mock.onPost(`http://localhost:8000/trip-shipment`).reply(200, "Trip Shipment not found.");
       const response = await axios.post("http://localhost:8000/trip-shipment");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Trip Shipment not found.");
    });
  });