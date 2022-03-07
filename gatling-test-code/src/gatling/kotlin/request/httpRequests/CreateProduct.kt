package request.httpRequests

import io.gatling.javaapi.core.CoreDsl
import io.gatling.javaapi.core.Session
import io.gatling.javaapi.http.HttpDsl
import request.RequestAuth
import urlConfig.createProduct

class CreateProduct(private val requestBody: String) {

  fun setSessionData(session: Session): Session {
    val request = RequestAuth(
      "POST", createProduct, null, requestBody
    )
    return session.setAll(request.sessionData)
  }

  val request = HttpDsl
    .http("create booking")
    .post { session -> session.getString("url") }
    .body(CoreDsl.StringBody(requestBody))
    .check(
      CoreDsl.jsonPath("$.resultCode").shouldBe("0"),
      CoreDsl.jsonPath("$.result.productId").saveAs("productId")
    )
}