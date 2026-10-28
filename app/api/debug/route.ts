export async function GET() {
  const res = await fetch("https://api.pokemontcg.io/v2/cards?pageSize=2&select=id,name,images");
  const text = await res.text();
  let img = 0;
  try {
    const j = JSON.parse(text);
    const r = await fetch(j.data[0].images.large, { method: "GET" });
    img = r.status;
  } catch {}
  return new Response(JSON.stringify({ status: res.status, img, body: text.slice(0, 800) }), { headers: { "content-type": "application/json" } });
}
