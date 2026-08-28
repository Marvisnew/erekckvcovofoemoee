const ORDER_EMAIL = process.env.ORDER_EMAIL || "debiltupoi52@gmail.com";
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

function ok(res) {
  if (res.statusCode && res.statusCode !== 200) {
    const err = new Error(`Web3Forms error ${res.statusCode}`);
    err.status = res.statusCode;
    err.body = res;
    throw err;
  }
  return res;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, address, comment } = req.body || {};
  if (!name || !phone || !address) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    return res.status(500).json({ error: "WEB3FORMS_ACCESS_KEY is not configured. Add it to .env.local and redeploy." });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submissions", {
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

    ok(response);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Order email error:", err);
    return res.status(500).json({ error: "Mail failed" });
  }
}
