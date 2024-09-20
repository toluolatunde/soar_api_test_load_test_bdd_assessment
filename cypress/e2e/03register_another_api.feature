Feature: Registration API Test For Reqres

Scenario: User should not be able to register with invalid email format
  Given I have the endpoint to register
  When I have the registration data with an invalid email
  When I send a POST request with the invalid email to the endpoint
  Then I should receive a response indicating the email format is invalid

Scenario: User should be able to register when valid data is passed
  Given I have the endpoint to register
  When I have the registration data
  When I send a POST request with valid data to the endpoint
  Then I should receive a valid response
