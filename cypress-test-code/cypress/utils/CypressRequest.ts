import RequestAuth from "./RequestAuth";

export default class CypressRequest extends RequestAuth {
  cypressRequest(expectedStatusCode: number) {
    return cy
      .request({
        headers: this.requestHeader,
        url: this.url,
        method: this.method,
        body: this.requestBody,
        failOnStatusCode: false,
      })
      .then((response) => {
        if (expectedStatusCode != null) {
          expect(response.status, "Response status code").to.eq(expectedStatusCode);
        }
      });
  }
}
