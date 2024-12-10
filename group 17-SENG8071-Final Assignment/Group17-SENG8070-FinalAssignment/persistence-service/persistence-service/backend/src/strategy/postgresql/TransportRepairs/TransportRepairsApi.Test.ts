import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

// Unit test case for get 

describe("Get TransportRepair by id", () => {
    it("returns /transport-repair/:id", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/transport-repair/1').reply(200, {repair_id: 1});
        const response = await axios.get("http://localhost:8000/transport-repair/1");
        const employeeDetails = response.data;
        expect(employeeDetails.repair_id).toBe(1);
    });
  });

  describe("Get TransportRepair Details by InvalidID But does not exist in records", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/transport-repair/ ').reply(200, "Transport repair not found.");
       const response = await axios.get("http://localhost:8000/transport-repair/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport repair not found.");
    });
  });

  describe("Update TransportRepair by id", () => {
    it("returns Updated /transport-repair/:id", async () => {
        const mock = new MockAdapter(axios);
        const requestBody = {
          transport_type_id : 2
        };
        mock.onPut(`http://localhost:8000/transport-repair/1`).reply(200, "Transport repair has been updated");
        const response = await axios.put("http://localhost:8000/transport-repair/1",requestBody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport repair has been updated");
        });
  });

  describe("Update TransportRepair by id by InvalidID type", () => {
    it("return error mesage ", async () => {
       const mock = new MockAdapter(axios);
       mock.onPut(`http://localhost:8000/transport-repair/1`).reply(200, "Transport repair update failed in db.");
       const response = await axios.put("http://localhost:8000/transport-repair/1");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport repair update failed in db.");
      
    });
  });

  describe("Delete TransportRepair by ID", () => {
    it("returns Delete TransportRepair details", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/transport-repair/5`).reply(200, "Transport repair has been deleted");
        const response = await axios.delete("http://localhost:8000/transport-repair/5");
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport repair has been deleted");
    });
  });

  describe("delete TransportRepair details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/transport-repair/ `).reply(200, "Transport repair deletion failed in db.");
       const response = await axios.delete("http://localhost:8000/transport-repair/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport repair deletion failed in db.");
    });
  });

  describe("Create a TransportRepair ", () => {
    it("returns create a new TransportRepair ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody =  {
          employee_id :6,
          transport_type_id:6
        };
        mock.onPost(`http://localhost:8000/transport-repair`,requestbody).reply(200, "Transport repair has been created");
        const response = await axios.post("http://localhost:8000/transport-repair",requestbody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Transport repair has been created");
    });
  });

  describe("create  TransportRepair by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody = null;
        mock.onPost(`http://localhost:8000/transport-repair`).reply(200, "Transport repair creation failed in db.");
       const response = await axios.post("http://localhost:8000/transport-repair");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Transport repair creation failed in db.");
    });
  });