Cypress.Commands.add("selectSingleItem", (elementSelector, value) => {
  const itemSelector = `[data-value="${value}"]`;
  return cy.get(elementSelector).click().get(itemSelector).click();
});

Cypress.Commands.add("input", (elementSelector, value) => {
  cy.get(elementSelector).clear().type(value).blur();
});