Feature: Error messages for anglers

  Scenario: setup
    Given I am an external user

  Scenario: Scenario 1 - An error message is shown if an invalid licence and postcode is entered
    Given I am on the licence entry page
    When  I submit the licence ABC123 and postcode AA11 1AA
    Then  I expect the error summary to show the following errors
      | There is a problem                                         |
      | You have not entered a correct licence number and postcode |
    And   I am redirected to /licence-auth-fail

  Scenario: Scenario 2 - An error message is shown on the activities page
    And   I am on the licence entry page
    And   I submit the licence and postcode for test user 1
    And   If it is the extended submission period I select the previous period on the season page
    And   I did fish during the season
    And   I am on the summary page and select the add river link

    # Scenario 2.1 - days fished with mandatory release too big
    And   I fished the river Ystrad for 900 days with mandatory release and 2 other days
    And   I confirm my activity details and continue
    Then  I expect the error summary to show the following errors
      | There is a problem                                                               |
      | You have not entered a valid number of days fished between 1 January and 16 June |
    
    # Scenario 2.2 - days fished with mandatory release and days other are 0
    And   I fished the river Ystrad for 0 days with mandatory release and 0 other days
    And   I confirm my activity details and continue
    Then  I expect the error summary to show the following errors
      | There is a problem                               |
      | The number of days fished must be greater than 0 |
    
    # Scenario 2.3 - days fished other too big
    And   I fished the river Ystrad for 10 days with mandatory release and 900 other days
    And   I confirm my activity details and continue
    Then  I expect the error summary to show the following errors
      | There is a problem                                                            |
      | You have not entered a valid number of days fished between 17 June and 31 Dec |

  Scenario: Scenario 3 - An error message is shown on the small catches page
    And   I fished the river Frome for 15 days with mandatory release and 1 other days
    And   I confirm my activity details and continue
    And   I am on the summary page and select the small catch link

    # Scenario 3.1 - negative caught by fly
    When  In January on the river Frome, I caught -2 by fly, 2 by spinner, 1 by bait and released 2
    And   I save the small catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                                     |
      | The number caught with a fly must be greater than zero |
    
    # Scenario 3.2 - released too high
    When  In January on the river Frome, I caught 1 by fly, 0 by spinner, 0 by bait and released 30
    And   I save the small catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                               |
      | You have released more fish than you have caught |
    
    # Scenario 3.3 - 0 for every field
    When  In January on the river Frome, I caught 0 by fly, 0 by spinner, 0 by bait and released 0
    And   I save the small catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                             |
      | You have not entered the number of fish caught |
  
  Scenario: Scenario 4 - An error message is shown on the large catches page
    And   In January on the river Frome, I caught 1 by fly, 2 by spinner, 1 by bait and released 1
    And   I save the small catch and return to the summary
    And   I am on the summary page and select the large catch link

    # Scenario 4.1 - invalid month
    When I caught a fish weighing 1 lbs 2 oz
    *    I select day as 1 and month as 13
    *    The catch river is Frome
    *    The catch species is Sea Trout
    *    The catch method is Fly
    *    The catch wasn't released    
    And   I save the large catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                |
      | You have not entered a valid date |
    
    # Scenario 4.2 - weight too large in kg
    When I caught a fish weighing 51kg
    *    I select a valid catch date
    *    The catch river is Frome
    *    The catch species is Salmon
    *    The catch method is Bait
    *    The catch wasn't released    
    And   I save the large catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                  |
      | You have not entered a valid weight |
    
    # Scenario 4.3 - weight too small in kg
    When I caught a fish weighing 0kg
    *    I select a valid catch date
    *    The catch river is Frome
    *    The catch species is Salmon
    *    The catch method is Bait
    *    The catch wasn't released    
    And   I save the large catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                  |
      | You have not entered a valid weight |
    
    # Scenario 4.4 - weight too large in lbs
    When I caught a fish weighing 1764 lbs 0 oz
    *    I select a valid catch date
    *    The catch river is Frome
    *    The catch species is Salmon
    *    The catch method is Bait
    *    The catch wasn't released    
    And   I save the large catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                  |
      | You have not entered a valid weight |
    
    # Scenario 4.5 - weight too small in lbs
    When I caught a fish weighing 0 lbs 0 oz
    *    I select a valid catch date
    *    The catch river is Frome
    *    The catch species is Salmon
    *    The catch method is Bait
    *    The catch wasn't released    
    And   I save the large catch and return to the summary
    Then  I expect the error summary to show the following errors
      | There is a problem                  |
      | You have not entered a valid weight |
