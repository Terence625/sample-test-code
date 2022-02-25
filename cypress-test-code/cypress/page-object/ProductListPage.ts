import AddProductPopUp from "./pop-ups/AddProductPopUp";
import EditProductPopUp from "./pop-ups/EditProductPopUp";
import DeleteProductPopUp from "./pop-ups/DeleteProductPopUp";

export default class ProductListPage {
  //the component elements reference on the product list page
  private static addProductButton = '[data-test-id="add-product-button"]';
  private static editProductButton = '[data-test-id="edit-product-button"]';
  private static deleteProductButton = '[data-test-id="delete-product-button"]';

  //pop-up classes
  static AddProductPopUp = class extends AddProductPopUp {};
  static EditProductPopUp = class extends EditProductPopUp {};
  static DeleteProductPopUp = class extends DeleteProductPopUp {};

  static clickAddProductButton() {
    cy.get(this.addProductButton).click();
  }

  static clickEditProductButton() {
    cy.get(this.editProductButton).click();
  }

  static clickDeleteProductButton() {
    cy.get(this.deleteProductButton).click();
  }
}
