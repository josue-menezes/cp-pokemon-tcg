// Sessão simples baseada em cookie httpOnly assinado.
// Roda no servidor (Route Handler e proxy). Nunca importe em componente "use client".

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 1 dia, em segundos

async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Gera "usuario.assinatura". Só quem conhece APP_PASSWORD consegue gerar a assinatura. */
export async function createSessionToken(user: string) {
  const signature = await sha256(`${user}:${process.env.APP_PASSWORD}`);
  return `${encodeURIComponent(user)}.${signature}`;
}

/** Confere se o cookie foi gerado pelo nosso servidor. */
export async function isValidSession(token: string | undefined) {
  if (!token || !process.env.APP_PASSWORD) return false;
  const [encodedUser, signature] = token.split(".");
  if (!encodedUser || !signature) return false;
  const expected = await sha256(`${decodeURIComponent(encodedUser)}:${process.env.APP_PASSWORD}`);
  return signature === expected;
}

export function getUserFromToken(token: string | undefined) {
  if (!token) return null;
  return decodeURIComponent(token.split(".")[0] ?? "");
}
