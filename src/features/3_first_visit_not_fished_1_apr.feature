Feature: Login to Rod Catch returns update, delete, first time to the service and submit

  Background:
    Given I am an external user
    And   I am on the licence entry page
    Then  I submit the licence and postcode for test user 1
    And   If it is the extended submission period I select the previous period on the season page

  Scenario: First login - Save
    Given I didn't fish during the season
    Then  I am on the review page
