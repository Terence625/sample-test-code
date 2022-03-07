package request.httpRequests

import io.gatling.javaapi.core.CoreDsl
import io.gatling.javaapi.core.Session
import io.gatling.javaapi.http.HttpDsl
import request.RequestAuth
import urlConfig.queryProductDetail

class QueryProductDetail() {

  fun setSessionData(session: Session): Session {
    val request = RequestAuth(
      "GET", queryProductDetail.replace(":id", session.getString("productId")), null, null
    )
    return session.setAll(request.sessionData)
  }

  val request =
    HttpDsl.http("query booking status").get { session -> session.getString("url") }.check(
        CoreDsl.jsonPath("$.resultCode").saveAs("resultCode")
      )
}
