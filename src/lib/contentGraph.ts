import Base64 from "crypto-js/enc-base64";
import md5 from "crypto-js/md5";
import hmacSHA256 from "crypto-js/hmac-sha256";

export function getAuthenticationHeader(url, method, body, appKey, secretKey) {
  const secret = Base64.parse(secretKey);
  const urlTemp = new URL(url);
  const target = urlTemp.pathname + urlTemp.search;
  const timestamp = new Date().getTime();
  const nonce = Math.random().toString(36).substring(7);
  const body_b64 = Base64.stringify(md5(body || ""));
  const message = appKey + method + target + timestamp + nonce + body_b64;
  const hmac = hmacSHA256(message, secret);
  const base64hmac = Base64.stringify(hmac);
  return `epi-hmac ${appKey}:${timestamp}:${nonce}:${base64hmac}`;
}
