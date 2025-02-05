import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message, inquiryType } = data;

    // Slackへの通知
    const slackPayload = {
      text: `新しいお問い合わせがありました\n
      種別: ${inquiryType.join(", ")}\n
      名前: ${name}\n
      メール: ${email}\n
      電話番号: ${phone}\n
      内容:\n${message}`,
    };

    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: "POST",
      body: JSON.stringify(slackPayload),
      headers: { "Content-Type": "application/json" },
    });

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 管理者向けメール
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: "【川の家おさか】新規お問い合わせ",
      text: `
        種別: ${inquiryType.join(", ")}
        お名前: ${name}
        メールアドレス: ${email}
        電話番号: ${phone}
        お問い合わせ内容:
        ${message}
      `,
    });

    // 自動返信メール
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "【川の家おさか】お問い合わせありがとうございます",
      text: `
        ${name} 様

        お問い合わせありがとうございます。
        以下の内容で承りました。
        担当者より順次ご連絡させていただきます。

        ─────────────────────────
        ■お問い合わせ内容
        種別: ${inquiryType.join(", ")}
        お名前: ${name}
        メールアドレス: ${email}
        電話番号: ${phone}
        お問い合わせ内容:
        ${message}
        ─────────────────────────

        ※このメールは自動送信されています。
        ※返信はお控えください。
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
