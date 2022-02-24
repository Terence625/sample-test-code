package simulations

import io.gatling.javaapi.core.*
import io.gatling.javaapi.core.CoreDsl.*
import io.gatling.javaapi.http.HttpDsl.*
import requestClass.RequestAuth
import urlConfig.UrlHost
import urlConfig.UrlPath

class QueryProductDetail : Simulation() {
  //set up the basic http protocol
  private val httpProtocol = http
    .baseUrl(UrlHost.host)
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36 Edg/96.0.1054.53")

  //The authorization of each api is through header which is generated dynamically
  //require using gatling feeder to inject different headers to different virtual users
  private val headerFeeder = RequestAuth.requestFeeder(
    "GET",
    UrlPath.queryProductDetail
  )

  //This scenario is to conduct load test on one single api
  private val scn = scenario("query product detail").feed(headerFeeder).exec(
    http("query product detail")
      .get(RequestAuth.url)
      .headers(RequestAuth.sentHeader)
      .check(status().shouldBe(200))
  )

  //open model, inject 100 users distributed evenly during 5 seconds
  init {
    setUp(
      scn.injectOpen(rampUsers(100).during(5)).protocols(httpProtocol)
    )
  }
}
