import { NextResponse } from "next/server";
import openai from "../../../../lib/chatGPT";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export async function GET() {
  const models = await openai.listModels().then((res) => res.data.data);
  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return NextResponse.json({ modelOptions });
}
