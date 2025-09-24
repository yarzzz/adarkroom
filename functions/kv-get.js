export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key) {
    return new Response("Missing key", { status: 400 });
  }
  const data = await env.MY_KV.get(key);
  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "text/plain" }
  });
}