Feature: Administrative users can check the license number in the records page

  Scenario: setup
    Given I am an administrative user
    And   I am on the admin login page
    Then  I submit the username and password for admin user 1

  Scenario: Admin clicks the records page
    When I click on the records link 
    Then I should see the license number records page

  Scenario: Admin enters invalid license number and sees error message
    Then I enter invalid license number '12240222-3'DC3FNK-ACRKP3'
    Then  I expect the error summary to show the following errors
      | There is a problem                      |
      | The licence number could not be matched |
