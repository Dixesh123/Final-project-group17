import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

// Unit test case for get 

describe("Get transport-trip by id", () => {
    it("returns /transport-trip/:id", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/transport-trip/1').reply(200, {trip_id: 1});
        const response = await axios.get("http://localhost:8000/transport-trip/1");
        const employeeDetails = response.data;
        expect(employeeDetails.trip_id).toBe(1);
    });
  });

  describe("Get transport-trip Details by InvalidID But does not exist in records", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/transport-trip/ ').reply(200, "Transport trip not found.");
       const response = await axios.get("http://localhost:8000/transport-trip/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport trip not found.");
    });
  });

  describe("Update transport-trip by id", () => {
    it("returns Updated /transport-repair/:id", async () => {
        const mock = new MockAdapter(axios);
        const requestBody = {
          transport_type_id : 2
        };
        mock.onPut(`http://localhost:8000/transport-trip/1`).reply(200, "Transport trip has been updated" );
        const response = await axios.put("http://localhost:8000/transport-trip/1",requestBody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport trip has been updated");
        });
  });

  describe("Update transport-trip by id by InvalidID type", () => {
    it("return error mesage ", async () => {
       const mock = new MockAdapter(axios);
       mock.onPut(`http://localhost:8000/transport-trip/1`).reply(200, "Transport repair update failed in db.");
       const response = await axios.put("http://localhost:8000/transport-trip/1");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport repair update failed in db.");
      
    });
  });

  describe("Delete transport-trip by ID", () => {
    it("returns Delete TransportRepair details", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/transport-trip/1`).reply(200, "Transport trip has been deleted");
        const response = await axios.delete("http://localhost:8000/transport-trip/1");
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport trip has been deleted");
    });
  });

  describe("delete transport-trip details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/transport-trip/ `).reply(200, "Transport trip deletion failed in db.");
       const response = await axios.delete("http://localhost:8000/transport-trip/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport trip deletion failed in db.");
    });
  });

  describe("Create a transport-trip ", () => {
    it("returns create a new transport-trip ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody =  {
          employee_id :6,
          transport_type_id:6
        };
        mock.onPost(`http://localhost:8000/transport-trip`,requestbody).reply(200, "Transport trip has been created");
        const response = await axios.post("http://localhost:8000/transport-trip",requestbody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport trip has been created");
    });
  });

  describe("create  transport-trip by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody = null;
        mock.onPost(`http://localhost:8000/transport-trip`).reply(200, "Transport trip creation failed in db.");
       const response = await axios.post("http://localhost:8000/transport-trip");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport trip creation failed in db.");
    });
  });