import { cloneDeep } from "lodash-es";
import product from "../../request-object/Product";

describe("api e2e test for the product workflow", () => {
  const createProductRequestBody = cloneDeep(
    require("../../fixtures/createProductRequestBody.json"),
  );
  const editProductRequestBody = cloneDeep(require("../../fixtures/editProductRequestBody.json"));

  it("api e2e test: create->get->edit->delete product", () => {
    product
      .createProduct(createProductRequestBody, 200)
      .its("body.productId")
      .then((productId) => {
        product.queryProductDetail(productId, 200);
        product.editProductDetail(productId, editProductRequestBody, 200);
        product.deleteProduct(productId, 200);
      });
  });
});
