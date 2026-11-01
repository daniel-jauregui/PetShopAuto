Feature: Product API
  Scenario: List products with authentication
    Given a registered API user
    When I request the products list
    Then the response is successful and contains products
