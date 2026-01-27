Feature: Login to Rod Catch returns update, delete, first time to the service and submit

  Background:
    Given I am an external user

  Scenario: Redirect to Licence Auth page
    Given I navigate to /
    Then  I am redirected to /licence-auth
  
  Scenario: First login - Save
    And   I am on the licence entry page
    Then  I submit the licence and postcode for test user 1