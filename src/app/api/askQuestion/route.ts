import { NextResponse } from "next/server";
import query from "../../../../lib/queryApi";
import admin from "firebase-admin";
import { adminDB } from "../../../../firebaseAdmin";

type Data = {
  anser: string;
};

export async function POST(req: Request) {
  const { prompt, chatId, model, session } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { answer: "Please provide a prompt!" },
      { status: 400 }
    );
  }
  if (!chatId) {
    return NextResponse.json(
      { answer: "Please provide a valid chat ID!" },
      { status: 400 }
    );
  }

  const res = await query(prompt, model);

  const message: Message = {
    text: res || "ChatGPT wasn't able to find an answer",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "/assets/chatIcon.png",
    },
  };

  await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return NextResponse.json({ answer: message.text });
}
