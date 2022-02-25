import { cloneDeep } from "lodash-es";
import { productListPageURLPATH } from "../../config/urlPathProduct";
import AddProductPopUp from "../../page-object/pop-ups/AddProductPopUp";
import ProductListPage from "../../page-object/ProductListPage";
import EditProductPopUp from "../../page-object/pop-ups/EditProductPopUp";
import DeleteProductPopUp from "../../page-object/pop-ups/DeleteProductPopUp";

describe("ui e2d test for the product workflow", () => {
  const createProductRequestBody = cloneDeep(
    require("../../fixtures/createProductRequestBody.json"),
  );
  const editProductRequestBody = cloneDeep(require("../../fixtures/editProductRequestBody.json"));

  it("ui e2e test: create->edit->delete", () => {
    cy.visit(productListPageURLPATH).toMatchImageSnapshot();
    ProductListPage.clickAddProductButton();
    ProductListPage.AddProductPopUp.inputProductInfo(createProductRequestBody);
    ProductListPage.AddProductPopUp.clickConfirmButton();
    ProductListPage.clickEditProductButton();
    ProductListPage.EditProductPopUp.inputProductInfo(editProductRequestBody);
    ProductListPage.EditProductPopUp.clickConfirmButton();
    ProductListPage.clickDeleteProductButton();
    ProductListPage.DeleteProductPopUp.clickConfirmButton();
  });
});
