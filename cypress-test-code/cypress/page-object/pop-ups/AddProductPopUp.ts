import DeleteProductPopUp from "./DeleteProductPopUp";

export default class AddProductPopUp extends DeleteProductPopUp {
  //the component elements reference on the add product pop up
  private static productNameSelectBox = '[data-test-id="product-name"]';
  private static brandSelectBox = '[data-test-id="brand"]';
  private static priceInputBox = '[data-test-id="price"]';
  private static expirationInputBox = '[data-test-id="expiration"]';

  static inputProductInfo(prodInfo) {
    cy.selectSingleItem(this.productNameSelectBox, prodInfo.productName)
      .selectSingleItem(this.brandSelectBox, prodInfo.brand)
      .input(this.priceInputBox, prodInfo.price)
      .input(this.expirationInputBox, prodInfo.expiration);
  }
}
