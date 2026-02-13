Feature: Administrative users can manage paper based returns

  Scenario: setup
    Given I am an administrative user
    And   I am on the admin login page
    And   I submit the username and password for admin user 1
  
  Scenario: Admin clicks the Age weight key page
    When  I click on the Age weight key link 
    Then  I should see the Age weight key page

  Scenario: Cancel upload
    When  I click on the Age weight key link 
    And   I click cancel
    Then  I am on the licence entry page

  Scenario: No gate selected
    When  I click on the Age weight key link
    And   I enter the year as the current year for the age weight key
    And   I upload the file age-weight-key (valid).csv to the age weight key    
    And   I click upload
    Then  I expect the error summary to show the following errors
      | There is a problem       |
      | Select an age weight key |
  
  Scenario: No year entered
    When  I click on the Age weight key link
    And   I select Dee as the gate for the age weight key
    And   I upload the file age-weight-key (valid).csv to the age weight key    
    And   I click upload
    Then  I expect the error summary to show the following errors
      | There is a problem |
      | Enter a year       |
  
  Scenario: Invalid year
    When  I click on the Age weight key link
    And   I enter the year as 1970 for the age weight key
    And   I select Dee as the gate for the age weight key
    And   I upload the file age-weight-key (valid).csv to the age weight key    
    And   I click upload
    Then  I expect the error summary to show the following errors
      | There is a problem |
      | Enter year between |
    
  Scenario: No file selected
    When  I click on the Age weight key link 
    And   I select Dee as the gate for the age weight key
    And   I enter the year as the current year for the age weight key
    And   I click upload
    Then  I expect the error summary to show the following errors
      | There is a problem |
      | Select a file      |
  
  Scenario: Successful Upload
    When  I click on the Age weight key link 
    And   I select Dee as the gate for the age weight key
    And   I enter the year as the current year for the age weight key
    And   I upload the file age-weight-key (valid).csv to the age weight key    
    And   I click upload
    And   If I am asked to replace the current age weight key I click yes
    Then  I am on the age weight key ok page
  
  Scenario: Upload file with duplicate headers
    When  I click on the Age weight key link 
    And   I select Dee as the gate for the age weight key
    And   I enter the year as the current year for the age weight key
    And   I upload the file age-weight-key (duplicate header).csv to the age weight key
    And   I click upload
    Then  I expect the error summary to show the following errors
      | There is a problem                                 |
      | The selected file must match the required template |
  
  Scenario: Upload empty file
    When  I click on the Age weight key link 
    And   I select Tamar as the gate for the age weight key
    And   I enter the year as the current year for the age weight key
    And   I upload the file age-weight-key (empty).csv to the age weight key
    And   I click upload
    Then  I expect the error summary to show the following errors
      | There is a problem         |
      | The selected file is empty |
  
  Scenario: Upload infected file
    When  I click on the Age weight key link 
    And   I select Dee as the gate for the age weight key
    And   I enter the year as the current year for the age weight key
    And   I upload the file eicar.com.csv to the age weight key
    And   I click upload
    # NOTE: If this test fail locally, check if antivirus is running. 
    # The admin frontend requires the antivirus to be running, if not a generic error message will be shown instead.
    Then  I expect the error summary to show the following errors
      | There is a problem                                      |
      | The selected file contains a virus, upload another file | 
