# sample-test-code
sample codes only demonstrate the code style, no real application applied
## ui test (Cypress, typescript)
Demonstrate an example of ui e2e test scenario of creating a new product in the system

A screenshot is token after the data is saved and the page is updated

## api test (Cypress, typescript)
Demonstrate an example of api integration test scenario of creating a new product in the system. 
 
The api authorization for the api gateway follows the method in https://www.codetd.com/en/article/10565997.
 
Test scenario: happy path with legal request body; negative path with missing properties of request body.

A text snapshot will be taken for each api response.

## e2e test (Cypress, typescript)
Demonstrate an example of api e2e test scenario of creating a new product and then edit and delete in the system.

The api authorization is same as the api test

## performance test (Gatling, Kotlin)
Demonstrate an example of api performance test scenario of querying prduct detail in the system. 

The api authorization is same as the api test

Test scenario: 100 users evenly call query product detail api during 5 seconds