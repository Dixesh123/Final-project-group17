import axios from "axios";

const targetUrl = `http://localhost:8000/company-employee`;

describe("company Get", () => {
  it("Company status is 200", async () => {
    console.log(targetUrl);
    const health = await axios.get(`${targetUrl}/1`);

    console.log(health.status);
    expect(health.status).toBe(200);
  });
});

describe("company Create", () => {
    it("Company status is 200", async () => {
      console.log(targetUrl);
      const requestBody = 
      {
        first_name: "test",
        last_name: "test",
        years_of_service: 1,
        is_mechanic: true,
        transport_type_name: 1
      };
      const health = await axios.post(`${targetUrl}`,requestBody);
  
      console.log(health.status);
      expect(health.status).toBe(200);
    });
  });

  describe("company Delete", () => {
    it("Company status is 200", async () => {
      console.log(targetUrl);
      const health = await axios.delete(`${targetUrl}/1`);
  
      console.log(health.status);
      expect(health.status).toBe(200);
    });
  });

  describe("company update", () => {
    it("Company status is 200", async () => {
        const requestBody = 
        {
          years_of_service: 1
        };
      const health = await axios.put(`${targetUrl}/1`,requestBody);
      console.log(health.status);
      expect(health.status).toBe(200);
    });
  });
