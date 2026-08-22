import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Вебхук Sanity → мгновенное обновление кэша страниц.
// В Sanity: Manage → API → Webhooks, projection: { "tags": [_type] }
export async function POST(req) {
  try {
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true
    );
    if (!isValidSignature) return new Response("Invalid signature", { status: 401 });
    const tags = Array.isArray(body?.tags) ? body.tags : [];
    if (!tags.length) return new Response("Missing tags", { status: 400 });
    tags.forEach((t) => revalidateTag(t));
    return NextResponse.json({ revalidated: tags });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
