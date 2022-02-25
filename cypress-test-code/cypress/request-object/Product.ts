import CypressRequest from "../utils/CypressRequest";
import {
  createProductAPIURLPATH,
  deleteProductAPIURLPATH,
  editProductDetailAPIURLPATH,
  queryProductDetailAPIURLPATH,
} from "../config/urlPathProduct";

class Product {
  createProduct(requestBody: object, expectedStatusCode: number) {
    const request = new CypressRequest("POST", createProductAPIURLPATH, null, requestBody);
    return request.cypressRequest(expectedStatusCode);
  }

  queryProductDetail(productId: string, expectedStatusCode: number) {
    const url = queryProductDetailAPIURLPATH.replace(":id", productId);
    const request = new CypressRequest("GET", url, null, null);
    return request.cypressRequest(expectedStatusCode);
  }

  editProductDetail(productId: string, requestBody: object, expectedStatusCode: number) {
    const url = editProductDetailAPIURLPATH.replace(":id", productId);
    const request = new CypressRequest("PUT", url, null, requestBody);
    return request.cypressRequest(expectedStatusCode);
  }

  deleteProduct(productId: string, expectedStatusCode: number) {
    const url = deleteProductAPIURLPATH.replace(":id", productId);
    const request = new CypressRequest("DELETE", url, null, null);
    return request.cypressRequest(expectedStatusCode);
  }
}

const product = new Product();
export default product;