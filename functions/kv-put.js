export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const body = await request.json();
  const key = body.key;  // 或者你固定用某个 key，比如 "userData"
  const value = body.value;
  if (!key) {
    return new Response("Missing key", { status: 400 });
  }
  await env.MY_KV.put(key, value);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}