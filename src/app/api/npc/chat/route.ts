import { NextResponse } from "next/server";
import { cityNpcs } from "@/features/lounge/loungeData";

export const runtime = "nodejs";

type NpcChatRequest = {
  npcId?: string;
  message?: string;
  context?: string;
};

const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.1:8b";
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as NpcChatRequest;
  const npc = cityNpcs.find((item) => item.id === body.npcId) ?? cityNpcs[0];
  const message = body.message?.trim() || "처음 만났어. 자연스럽게 말을 걸어줘.";

  const prompt = [
    "너는 Human Connect라는 3D 소셜 도시 안의 NPC다.",
    "한국어로 1~2문장만 답한다.",
    "너무 설명적이지 말고, 실제 사람이 지나가다 말하는 듯 자연스럽게 답한다.",
    `이름: ${npc.name}`,
    `역할: ${npc.role}`,
    `성격: ${npc.personality}`,
    `관심사: ${npc.interests.join(", ")}`,
    body.context ? `현재 맥락: ${body.context}` : "",
    `사용자: ${message}`
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.72,
          num_predict: 90
        }
      }),
      signal: AbortSignal.timeout(4500)
    });

    if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
    const data = (await response.json()) as { response?: string };
    const text = data.response?.trim();
    if (text) {
      return NextResponse.json({ npc, text, provider: "ollama" });
    }
  } catch {
    // Vercel deployments cannot reach a user's local Ollama by default.
  }

  return NextResponse.json({
    npc,
    text: getFallbackReply(npc.role, message),
    provider: "fallback"
  });
}

function getFallbackReply(role: string, message: string) {
  if (/안녕|처음|hello/i.test(message)) {
    return `${role}로서 말하자면, 여기서는 가까이 다가가서 짧게 묻는 게 제일 자연스러워요. 지금 관심 있는 테이블 쪽으로 같이 걸어볼까요?`;
  }

  if (/아이디어|창업|MVP|고객/i.test(message)) {
    return "일단 가장 작은 실험으로 줄여보세요. 오늘 안에 한 사람에게 보여줄 수 있는 형태면 대화가 훨씬 빨라져요.";
  }

  if (/코드|개발|버그|기술/i.test(message)) {
    return "문제를 크게 설명하기보다 재현 조건 하나를 먼저 잡아보세요. 그러면 근처 개발자 테이블에서도 바로 이야기가 이어질 거예요.";
  }

  if (/디자인|브랜드|UX|화면/i.test(message)) {
    return "사용자가 처음 보는 순간 무엇을 해야 할지 알 수 있는지가 핵심이에요. 멀리서 봐도 목적이 보이면 훨씬 좋아집니다.";
  }

  return "좋아요. 그 이야기는 근처 사람에게도 꽤 잘 이어질 것 같아요. 조금 더 구체적으로 말해주면 제가 다음 질문을 던져볼게요.";
}
