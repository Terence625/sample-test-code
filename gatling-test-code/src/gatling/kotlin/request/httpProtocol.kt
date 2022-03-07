package request

import io.gatling.javaapi.http.HttpDsl
import io.gatling.javaapi.http.HttpProtocolBuilder

fun httpProtocol(): HttpProtocolBuilder {
  return HttpDsl.http
    .baseUrl("http://localhost:3000/")
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36 Edg/96.0.1054.53")
    .headers(RequestAuth.commonHeader)
    .header("Content-MD5") { session -> session.getString("Content-MD5") }
    .header("X-Ca-Signature") { session -> session.getString("X-Ca-Signature") }
    .header("X-Ca-Nonce") { session -> session.getString("X-Ca-Nonce") }
}
