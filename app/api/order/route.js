import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, phone, email, address, comment } = req.body || {};
  if (!name || !phone || !address) return res.status(400).json({ error: "Missing fields" });

  const to = process.env.ORDER_EMAIL || "debiltupoi52@gmail.com";
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "store@example.com";

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from,
      to,
      subject: `Новый заказ на КовёрБай — ${name}`,
      text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email || "—"}\nАдрес: ${address}\nКомментарий: ${comment || "—"}`,
      html: `<p><strong>Имя:</strong> ${name}</p><p><strong>Телефон:</strong> ${phone}</p><p><strong>Email:</strong> ${email || "—"}</p><p><strong>Адрес:</strong> ${address}</p><p><strong>Комментарий:</strong> ${comment || "—"}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Order email error:", err);
    return res.status(500).json({ error: "Mail failed" });
  }
}
