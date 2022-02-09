package requestClass

import java.security.MessageDigest
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.time.LocalDateTime


class RequestAuth(
  private val method: String,
  private val path: String,
  queryParam: Map<String, String>? = null,
  requestBody: String? = null
) {
  private val date: String = LocalDateTime.now().toString()
  private var md5: String = calcMd5(requestBody)
  private val nonce: String = createUuid()
  private var url: String = urlToSign(queryParam)
  private var signature: String = getSign()

  companion object {
    const val url: String = "#{url}"

    //the header required by every api
    val sentHeader: Map<String, String> = mapOf(
      "Content-MD5" to "#{md5}",
      "X-Ca-Nonce" to "#{nonce}",
      "X-Ca-Signature" to "#{signature}",
      "Content-Type" to "application/json",
      "Date" to "#{Date}",
      "X-Ca-Signature-Headers" to "x-ca-key,x-ca-nonce,x-ca-signaturemethod",
      "X-Ca-Key" to System.getenv("APP_KEY"),
      "X-Ca-SignatureMethod" to "HmacSHA256"
    )

    //
    fun requestFeeder(method: String, path: String): Iterator<Map<String, String>> {
      return generateSequence {
        val requestAuth = RequestAuth(method, path)
        requestAuth.buildHeaderMap()
      }.iterator()
    }

    //request feeder for api with request body
    fun requestFeeder(
      method: String, path: String, requestBody: String
    ): Iterator<Map<String, String>> {
      return generateSequence {
        val requestAuth = RequestAuth(method, path, requestBody = requestBody)
        requestAuth.buildHeaderMap()
      }.iterator()
    }

    //request feeder for api with query parameter
    fun requestFeeder(
      method: String, path: String, queryParam: Map<String, String>
    ): Iterator<Map<String, String>> {
      return generateSequence {
        val requestAuth = RequestAuth(method, path, queryParam = queryParam)
        requestAuth.buildHeaderMap()
      }.iterator()
    }
  }

  fun buildHeaderMap(): Map<String, String> {
    return mapOf(
      "url" to url,
      "md5" to md5,
      "nonce" to nonce,
      "signature" to signature,
      "Date" to date,
    )
  }

  private fun createUuid(): String {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(Regex("[xy]")) { c ->
      val randomVal = (0..16).random()
      if (c.value == "x") {
        randomVal.toString(16)
      } else {
        ((randomVal and 0x3) or 0x8).toString(16)
      }
    }
  }

  private fun calcMd5(requestBody: String?): String {
    return if (requestBody == null) {
      ""
    } else {
      val md = MessageDigest.getInstance("MD5")
      md.update(requestBody.toByteArray())
      val digest = md.digest()
      Base64.getEncoder().encodeToString(digest)
    }
  }

  private fun urlToSign(queryParam: Map<String, String>?): String {
    return if (queryParam == null) {
      path
    } else {
      val sortedQuery = queryParam.toSortedMap()
      var queryString = ""
      for ((key, value) in sortedQuery) {
        val subQueryString = "$key=$value"
        queryString = if (queryString != "") "$queryString&$subQueryString" else subQueryString
      }
      "$path?$queryString"
    }
  }

  private fun getSign(): String {
    val headersToSign = mapOf(
      "X-Ca-Key" to System.getenv("APP_KEY"),
      "X-Ca-Nonce" to nonce,
      "X-Ca-SignatureMethod" to "HmacSHA256",
    )
    var textToSign = "$method\n*/*\n$md5\napplication/json\n$date\n"
    for ((key, value) in headersToSign) {
      textToSign += "$key:$value\n"
    }
    textToSign += url
    val hMacSHA256 = Mac.getInstance("HmacSHA256")
    val secretKey = SecretKeySpec(System.getenv("APP_SECRET").toByteArray(), "HmacSHA256")
    hMacSHA256.init(secretKey)
    val data = hMacSHA256.doFinal(textToSign.toByteArray())
    return Base64.getEncoder().encodeToString(data)
  }
}