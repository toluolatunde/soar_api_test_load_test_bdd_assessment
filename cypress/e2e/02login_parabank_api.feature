Feature: Login API Tests

  Scenario: Validate user can login with valid credentials
    Given I have the endpoint to login
    When I send a POST request with correct credentials to the endpoint
    Then I should receive a valid response