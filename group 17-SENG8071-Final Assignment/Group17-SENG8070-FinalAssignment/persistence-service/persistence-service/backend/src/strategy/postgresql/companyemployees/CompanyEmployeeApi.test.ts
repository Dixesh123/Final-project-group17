
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { CompanyEmployee } from "./CompanyEmployees";




// Unit test case for get 

describe("Get Employee Details by ID", () => {
    it("returns employee details", async () => {
      const mock = new MockAdapter(axios);
      mock.onGet("http://localhost:8000/company-employee/1").reply(200, {employee_id:1});
        const response = await axios.get("http://localhost:8000/company-employee/1");
        const employeeDetails = response.data;
        expect(employeeDetails.employee_id).toBe(1);
    });
  });
  describe("Get Employee Details by ValidID But does not exist in records", () => {
    it("return error mesage ", async () => {
      
      const mock = new MockAdapter(axios);
      mock.onGet(`http://localhost:8000/company-employee/ `).reply(200, "Employe Id does Not exists");
       const response = await axios.get("http://localhost:8000/company-employee/ ");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Employe Id does Not exists");
    });
  });

  describe("Update Employee Details by ID", () => {
    it("returns Updated employee details", async () => {
        const mock = new MockAdapter(axios);
        const requestBody = {
            years_of_service : 10
        };
        mock.onPut(`http://localhost:8000/company-employee/4`).reply(200, "Company employee has been updated with id: 4");
        const response = await axios.put("http://localhost:8000/company-employee/4",requestBody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Company employee has been updated with id: 4");
        });
  });
  describe("Update Employee Details by InvalidID type", () => {
    it("return error mesage ", async () => {
       const mock = new MockAdapter(axios);
       mock.onPut(`http://localhost:8000/company-employee/**`).reply(200, "Invalid employee ID or request body years of service.");
       const response = await axios.put("http://localhost:8000/company-employee/**");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Invalid employee ID or request body years of service.");
      
    });
  });
  
  describe("Delete Employee Details by ID", () => {
    it("returns Updated employee details", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/company-employee/4`).reply(200, "Company employee has been deleted with id: 4");
        const response = await axios.delete("http://localhost:8000/company-employee/4");
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Company employee has been deleted with id: 4");
    });
  });
  describe("delete Employee Details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        mock.onDelete(`http://localhost:8000/company-employee/**`).reply(200, "Invalid employee ID.");
       const response = await axios.delete("http://localhost:8000/company-employee/**");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Invalid employee ID.");
    });
  });

  describe("Create a Employee Details with details ", () => {
    it("returns create a new  employee ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody =  {
            first_name :"test", 
            last_name : "test",
            years_of_service : 10,
            is_mechanic : true,
            transport_type_name : 1
        };
        mock.onPost(`http://localhost:8000/company-employee`,requestbody).reply(200, "Company employee has been created");
        const response = await axios.post("http://localhost:8000/company-employee",requestbody);
        const employeeDetails = response.data;
        expect(employeeDetails).toBe("Company employee has been created");
    });
  });
  describe("create  Employee Details by InvalidID type", () => {
    it("return error mesage ", async () => {
        const mock = new MockAdapter(axios);
        const requestbody = null;
        mock.onPost(`http://localhost:8000/company-employee`).reply(200, "Invalid request parameters.");
       const response = await axios.post("http://localhost:8000/company-employee");
       const employeeDetails = response.data;
       expect(employeeDetails).toBe("Invalid request parameters.");
    });
  });

  import { Express, Request, Response } from "express";
import { DataSource, IntegerType } from "typeorm";

import { DataConnector } from "../configure";
interface Options
{
  id : number;
}

