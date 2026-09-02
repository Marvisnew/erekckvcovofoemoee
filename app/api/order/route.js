import { NextResponse } from "next/server";

const ORDER_EMAIL = process.env.ORDER_EMAIL || "debiltupoi52@gmail.com";
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

export async function POST(req) {
  const { name, phone, email, address, comment } = await req.json();
  if (!name || !phone || !address) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    return NextResponse.json(
      { error: "WEB3FORMS_ACCESS_KEY is not configured. Add it to .env.local and redeploy." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: name,
        email: email || ORDER_EMAIL,
        subject: `Новый заказ на КовёрБай — ${name}`,
        message: `Новый заказ:\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || "—"}\nАдрес: ${address}\nКомментарий: ${comment || "—"}`,
        to: ORDER_EMAIL,
      }),
    });

    const result = await response.json();
    if (!response.ok || result.success === false) {
      throw new Error(result.message || `Web3Forms error ${response.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order email error:", err);
    return NextResponse.json({ error: "Mail failed" }, { status: 500 });
  }
}
