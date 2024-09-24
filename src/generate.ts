export async function generatePassword(
  message: string,
  length: number,
  fixedKey: string
) {
  // 1. 将输入字符串编码为二进制数据
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // 2. 使用 HMAC-SHA-256 生成哈希值（你也可以直接使用 SHA-256）
  const key = encoder.encode(fixedKey); // 固定密钥，用于增强哈希结果的安全性
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    true,
    ["sign"]
  );
  const hashBuffer = await crypto.subtle.sign("HMAC", cryptoKey, data);

  // 3. 将哈希值转为 Base64，并取所需长度
  return bufferToBase64(hashBuffer).substring(0, length);
}

// 将 ArrayBuffer 转为 Base64 编码
function bufferToBase64(buffer: ArrayBuffer) {
  const byteArray = new Uint8Array(buffer);
  const byteString = String.fromCharCode(...byteArray);
  return btoa(byteString);
}
