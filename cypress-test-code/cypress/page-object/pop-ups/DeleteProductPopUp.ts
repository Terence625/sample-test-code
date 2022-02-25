export default class DeleteProductPopUp {
  private static confirmButton = '[data-test-id="confirm"]';
  private static cancelButton = '[data-test-id="cancel"]';

  //every time a pop-up form is updated, the whole page will be refreshed and a image snapshot will be added
  static clickConfirmButton() {
    cy.get(this.confirmButton).click().toMatchImageSnapshot();
  }

  static clickCancelButton() {
    cy.get(this.cancelButton).click().toMatchImageSnapshot();
  }
}
