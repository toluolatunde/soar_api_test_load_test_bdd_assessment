Feature: Login API Test for Reqres

  Scenario: Validate user cannot login with incorrect password
    Given I have the endpoint to login
    When I send a POST request with correct username and no password value to the endpoint
    Then I should receive a response indicating missing password

  Scenario: Validate user cannot login with unregistered username
    Given I have the endpoint to login
    When I send a POST request with an unregistered username and any password to the endpoint
    Then I should receive a response indicating the user does not exist

  Scenario: Validate user can login with valid credentials
    Given I have the endpoint to login
    When I send a POST request with correct credentials to the endpoint
    Then I should receive a valid response