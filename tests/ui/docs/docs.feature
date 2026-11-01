Feature: Swagger documentation
  Scenario: Show the products section
    Given I open the API documentation
    Then I see the PetShop API title
    And I see the Products section
