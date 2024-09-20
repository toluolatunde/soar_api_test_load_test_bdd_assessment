Feature: Registeration API Tests

  Scenario: User should be able to register when valid data is passed
    Given I have the endpoint to register
    When I have the registration data
    When I send a POST request with valid data to the endpoint
    Then I should receive a valid response
    
