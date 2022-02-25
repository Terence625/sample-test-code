import _ from "lodash";
import { cloneDeep } from "lodash-es";
import product from "../../request-object/Product";
import { nullObjectListGenerator } from "../../utils/nullObjectListGenerator";

describe("Integration test for create product API", () => {
  const createProductRequestBody = cloneDeep(
    require("../../fixtures/createProductRequestBody.json"),
  );

  //the create product api will return a system-generated productId
  //toMatchSnapshot is to take a snapshot of the api response body
  it("create product successfully", () => {
    product
      .createProduct(createProductRequestBody, 200)
      .its("body")
      .then((res) => {
        _.set(res, "productId", "mocked");
        return res;
      })
      .toMatchSnapshot();
  });

  //generate a list of create product request body with missing properties values
  //iterate the request body list to call the create product api and take snapshot of each response body
  it("create product unsuccessfully with missing properties in request body", () => {
    const requestBodyList = nullObjectListGenerator(createProductRequestBody);
    requestBodyList.forEach((requestBody) => {
      product.createProduct(requestBody, 200).its("body").toMatchSnapshot();
    });
  });
});
