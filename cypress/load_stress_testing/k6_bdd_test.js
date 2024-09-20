import { check, group, sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 100,
  duration: "30s",
};

export default function() {
  group("BDD Scenario: Login Endpoint Stress and Load Testing", function() {
    let loginData;
    const loginUrl = "https://dummyjson.com/auth/login"; // Replace with your actual login URL

    group("Given a user has valid login credentials", function() {
      // Generating unique login data for each user
      loginData = {
        username: `testuser${__VU}`,
        password: "Test@1234",
      };
    });

    let response = null;

    group("When users attempts to log in", function() {
      response = http.post(loginUrl, JSON.stringify(loginData), {
        headers: { "Content-Type": "application/json" },
      });

      check(response, {
        "is status 200": (r) => r.status === 200,
        "is status 400": (r) => r.status === 400,
        "response contains token": (r) =>
          r.status === 200 && r.json().token !== undefined,
      });
    });

    group("Then: the expected response should be returned", function() {
      //Because i have not created all these users I expect 400 bad request to be returned
      if (response.status === 200) {
        console.log(`Login successful for user: ${loginData.username}`);
      } else if (response.status === 400) {
        console.log(
          `Login failed for user: ${loginData.username}. Bad request.`
        );
      } else {
        console.log(
          `Unexpected response for user: ${loginData.username}. Status: ${response.status}`
        );
      }
    });

    sleep(1); // Simulate user think time
  });
}
