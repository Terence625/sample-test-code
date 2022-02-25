import * as CryptoJS from "crypto-js";

export default class RequestAuth {
  //cypress's default accept and content type, so ignore the validation of other content type in this test
  readonly accept = "*/*";
  readonly contentType = "application/json";
  readonly appKey = Cypress.env("appKey");
  readonly appSecret = Cypress.env("appSecret");

  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  queries: object;
  url: string;
  requestBody: object;
  requestHeader: object;

  constructor(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    queries: object,
    requestBody: object,
  ) {
    this.method = method;
    this.path = path;
    this.queries = queries;
    this.requestBody = requestBody;
    this.url = this.urlToSign();
    this.requestHeader = this.getRequestHeader()
  }

  private getRequestHeader() {
    let md5 = this.calcMd5();
    let date = new Date().toLocaleString();
    let nonce = this.createUuid();
    let textToSign =
      this.method + "\n" + this.accept + "\n" + md5 + "\n" + this.contentType + "\n" + date + "\n";
    let signatureHeaders;
    let headersToSign = new Map();
    //these three headers will be added to signature
    headersToSign.set("X-Ca-SignatureMethod", "HmacSHA256");
    headersToSign.set("X-Ca-Key", this.appKey);
    headersToSign.set("X-Ca-Nonce", nonce);
    let sortedKeys = Array.from(headersToSign.keys()).sort();
    for (let headerName of sortedKeys) {
      textToSign += headerName + ":" + headersToSign.get(headerName) + "\n";
      signatureHeaders = signatureHeaders ? signatureHeaders + "," + headerName : headerName;
    }
    //the url be added into signature should sort its queries first
    textToSign += this.urlToSign();
    let signature = CryptoJS.HmacSHA256(textToSign, this.appSecret).toString(CryptoJS.enc.Base64);
    //build the request header
    return {
      Date: date,
      "Content-MD5": md5,
      "X-Ca-Nonce": nonce,
      "X-Ca-Key": this.appKey,
      "X-Ca-Signature": signature,
      "X-Ca-SignatureMethod": "HmacSHA256",
      "X-Ca-Signature-Headers": signatureHeaders,
      "Content-Type": this.contentType,
    };
  }

  private urlToSign() {
    if (this.queries) {
      let sortedKeys = Object.keys(this.queries).sort();
      let queryString;
      for (let key of sortedKeys) {
        let s = key + "=" + this.queries[key];
        queryString = queryString ? queryString + "&" + s : s;
      }
      return this.path + "?" + queryString;
    } else {
      return this.path;
    }
  }

  private calcMd5() {
    //won't calculate MD5 if no request body or request body is empty
    if (this.requestBody && JSON.stringify(this.requestBody) !== "{}") {
      return CryptoJS.MD5(JSON.stringify(this.requestBody)).toString(CryptoJS.enc.Base64);
    } else {
      return "";
    }
  }

  private createUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}