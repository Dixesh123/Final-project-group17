import axios from "axios";
import MockAdapter from 'axios-mock-adapter';





// Unit test case for get 

describe("Get Shipment by id", () => {
    it("returns shipment/:id", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/shipment/1').reply(200, {customer_id: 1});
        const response = await axios.get("http://localhost:8000/shipment/1");
        const employeeDetails = response.data;
        expect(employeeDetails.customer_id).toBe(1);
    });
  });

  describe("Get shipment Details by InvalidID But does not exist in records", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8000/shipment/ ').reply(200, "Shipment not found.");
       const response = await axios.get("http://localhost:8000/shipment/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Shipment not found.");
    });
  });

  describe("Update shipment by id", () => {
    it("returns Updated /shipment:id", async () => {
        const mock = new MockAdapter(axios);
        const requestBody = {
          transport_type_id : 2
        };
        mock.onPut(`http://localhost:8000/shipment/1`).reply(200, "Shipment has been updated");
        const response = await axios.put("http://localhost:8000/shipment/1",requestBody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Shipment has been updated");
        });
  });

  describe("Update shipment by id by InvalidID type", () => {
    it("return error mesage ", async () => {
       const mock = new MockAdapter(axios);
       mock.onPut(`http://localhost:8000/shipment/1`).reply(200, "Shipment update failed in db.");
       const response = await axios.put("http://localhost:8000/shipment/1");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Shipment update failed in db.");
      
    });
  });

  describe("Delete shipment by ID", () => {
    it("returns Delete shipment details", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/shipment/5`).reply(200, "Shipment has been deleted");
        const response = await axios.delete("http://localhost:8000/shipment/5");
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Shipment has been deleted");
    });
  });

  describe("delete shipment details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/shipment/ `).reply(200, "Shipment deletion failed in db.");
       const response = await axios.delete("http://localhost:8000/shipment/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Shipment deletion failed in db.");
    });
  });

  describe("Create a shipment ", () => {
    it("returns create a new shipment ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody =  {
          employee_id :6,
          transport_type_id:6
        };
        mock.onPost(`http://localhost:8000/shipment`,requestbody).reply(200, "Shipment has been created");
        const response = await axios.post("http://localhost:8000/shipment",requestbody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Shipment has been created");
    });
  });

  describe("create  shipment by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody = null;
        mock.onPost(`http://localhost:8000/shipment`).reply(200, "Shipment creation failed in db.");
       const response = await axios.post("http://localhost:8000/shipment");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Shipment creation failed in db.");
    });
  });