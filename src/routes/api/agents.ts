import { createFileRoute } from "@tanstack/react-router";

type Body = {
  stage: "pesquisar" | "criar" | "revisar" | "postar";
  topic?: string;
  niche?: string;
  research?: string;
  slides?: unknown;
  slideCount?: number;
};

const MODEL = "google/gemini-3.6-flash";

function promptFor(b: Body): { system: string; user: string } {
  const base = `Você é um time de agentes de conteúdo para Instagram no Brasil. Responda SEMPRE em português do Brasil e SEMPRE em JSON válido, sem markdown, sem crases.`;

  switch (b.stage) {
    case "pesquisar":
      return {
        system: base,
        user: `AGENTE PESQUISADOR. Nicho: "${b.niche}". Tema: "${b.topic}".
Pesquise mentalmente ângulos, dores, objeções e dados plausíveis.
Responda JSON: {"resumo": string (até 400 caracteres), "angulos": string[5], "palavrasChave": string[6]}`,
      };
    case "criar":
      return {
        system: base,
        user: `AGENTE CRIADOR. Nicho: "${b.niche}". Tema: "${b.topic}".
Pesquisa: ${b.research || "(sem pesquisa)"}
Crie um carrossel de ${b.slideCount || 6} cards. O card 1 é CAPA estilo revista (headline curtíssima e impactante, máx 6 palavras).
Use **asteriscos duplos** ao redor de 1 a 3 palavras-chave que devem ser marcadas em cada título.
Responda JSON:
{"slides":[{"kicker": string curto (máx 3 palavras), "title": string, "body": string (até 160 caracteres, vazio na capa)}],
 "legenda": string (legenda pronta para postar com quebras de linha),
 "hashtags": string[8],
 "promptImagem": string (prompt em inglês para gerar a foto de capa, fotografia editorial)}`,
      };
    case "revisar":
      return {
        system: base,
        user: `AGENTE REVISOR. Revise ortografia, corte gordura, aumente clareza e força de copy. Mantenha a MESMA estrutura e quantidade de slides. Mantenha as marcações **palavra**.
Conteúdo atual: ${JSON.stringify(b.slides)}
Responda JSON: {"slides":[{"kicker":string,"title":string,"body":string}], "notas": string[3]}`,
      };
    case "postar":
      return {
        system: base,
        user: `AGENTE DE PUBLICAÇÃO. Com base nos cards: ${JSON.stringify(b.slides)} e no nicho "${b.niche}".
Responda JSON: {"legenda": string (copy pronta para o Instagram, com CTA e quebras de linha), "hashtags": string[10], "melhorHorario": string, "primeiroComentario": string}`,
      };
  }
}

function extractJson(text: string) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Resposta inválida do modelo");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export const Route = createFileRoute("/api/agents")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as Body;
        const { system, user } = promptFor(body);

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: MODEL,
            messages: [
              { role: "system", content: system },
              { role: "user", content: user },
            ],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          return new Response(text || "Erro no gateway", { status: res.status });
        }

        const json = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const content = json.choices?.[0]?.message?.content ?? "";
        try {
          return Response.json(extractJson(content));
        } catch {
          return new Response("Não foi possível interpretar a resposta da IA", {
            status: 502,
          });
        }
      },
    },
  },
});
