import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

// Unit test case for get 

describe("Get transport-type by id", () => {
    it("returns /transport-type/:id", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/transport-type/1').reply(200, {transport_type_id: 1});
        const response = await axios.get("http://localhost:8000/transport-type/1");
        const employeeDetails = response.data;
        expect(employeeDetails.transport_type_id).toBe(1);
    });
  });

  describe("Get transport-type Details by InvalidID But does not exist in records", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/transport-type/ ').reply(200, "Transport type not found.");
       const response = await axios.get("http://localhost:8000/transport-type/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport type not found.");
    });
  });

  describe("Update transport-type by id", () => {
    it("returns Updated /transport-repair/:id", async () => {
        const mock = new MockAdapter(axios);
        const requestBody = {
          transport_type_id : 2
        };
        mock.onPut(`http://localhost:8000/transport-type/1`).reply(200, "Transport type has been updated" );
        const response = await axios.put("http://localhost:8000/transport-type/1",requestBody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport type has been updated");
        });
  });

  describe("Update transport-type by id by InvalidID type", () => {
    it("return error mesage ", async () => {
       const mock = new MockAdapter(axios);
       mock.onPut(`http://localhost:8000/transport-type/1`).reply(200, "Transport type update failed in db.");
       const response = await axios.put("http://localhost:8000/transport-type/1");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport type update failed in db.");
      
    });
  });

  describe("Delete transport-type by ID", () => {
    it("returns Delete TransportRepair details", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/transport-type/1`).reply(200, "Transport type has been deleted");
        const response = await axios.delete("http://localhost:8000/transport-type/1");
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport type has been deleted");
    });
  });

  describe("delete transport-type details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/transport-type/ `).reply(200, "Transport type deletion failed in db.");
       const response = await axios.delete("http://localhost:8000/transport-type/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport type deletion failed in db.");
    });
  });

  describe("Create a transport-type ", () => {
    it("returns create a new transport-trip ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody =  {
          employee_id :6,
          transport_type_id:6
        };
        mock.onPost(`http://localhost:8000/transport-type`,requestbody).reply(200, "Transport type has been created");
        const response = await axios.post("http://localhost:8000/transport-type",requestbody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport type has been created");
    });
  });

  describe("create transport-type by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody = null;
        mock.onPost(`http://localhost:8000/transport-type`).reply(200, "Transport type not found.");
       const response = await axios.post("http://localhost:8000/transport-type");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport type not found.");
    });
  });