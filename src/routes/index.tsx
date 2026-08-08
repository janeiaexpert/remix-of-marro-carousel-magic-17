import { createFileRoute } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carrosséis por Nicho | Templates prontos" },
      {
        name: "description",
        content:
          "Templates de carrossel para Instagram organizados por nicho: fitness, estética, nutrição, imobiliária, marketing e notícias.",
      },
      { property: "og:title", content: "Carrosséis por Nicho | Templates prontos" },
      {
        property: "og:description",
        content:
          "Escolha o nicho, gere o carrossel e baixe em PNG. Design em marrom, preto e branco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const niches = [
  {
    tag: "01",
    niche: "Academia / Fitness",
    headline: "Você não precisa de mais motivação. Precisa de um plano.",
    sub: "O treino de 45 minutos que cabe na sua rotina.",
  },
  {
    tag: "02",
    niche: "Clínica de Estética",
    headline: "Harmonização não é exagero. É equilíbrio.",
    sub: "O que avaliar antes de fechar seu procedimento.",
  },
  {
    tag: "03",
    niche: "Nutricionista",
    headline: "Comer bem não é comer menos.",
    sub: "Os 3 ajustes no prato que mudam sua energia na primeira semana.",
  },
  {
    tag: "04",
    niche: "Imobiliária",
    headline: "O erro que faz você pagar caro no primeiro imóvel.",
    sub: "Confira isso antes de assinar qualquer contrato.",
  },
  {
    tag: "05",
    niche: "Marketing",
    headline: "Seu conteúdo não vende porque ninguém para no primeiro card.",
    sub: "O ajuste que dobra o retorno antes de aumentar o orçamento.",
  },
  {
    tag: "06",
    niche: "Notícias",
    headline: "A decisão que mexe com o bolso de todo brasileiro.",
    sub: "O que muda a partir da próxima semana.",
  },
];

function Index() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="font-display text-2xl tracking-wide">
            CARROSSEL<span className="text-primary">.</span>NICHO
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Marrom · Preto · Branco
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary">
          Templates por nicho
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Escolha o nicho.
          <br />
          O carrossel já vem pronto.
        </h1>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          Seis modelos editoriais, tipografia nítida e capa de impacto. Arraste para
          navegar entre os nichos.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {niches.map((item) => (
              <CarouselItem
                key={item.tag}
                className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <article className="flex h-full flex-col border border-border bg-card">
                  <div className="relative flex aspect-[4/5] flex-col justify-end bg-ink p-6 text-ink-foreground">
                    <span className="absolute left-6 top-6 border border-ink-foreground/30 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-foreground/70">
                      {item.tag} / 06
                    </span>
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.35]"
                      style={{
                        background:
                          "radial-gradient(120% 80% at 20% 0%, var(--accent), transparent 60%)",
                      }}
                    />
                    <div className="relative">
                      <h2 className="font-display text-3xl leading-[0.95] tracking-wide">
                        {item.headline}
                      </h2>
                      <p className="mt-3 text-xs leading-relaxed text-ink-foreground/70">
                        {item.sub}
                      </p>
                      <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ink-foreground/60">
                        <span>01/06</span>
                        <span>Arrasta →</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border px-5 py-4">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {item.niche}
                    </span>
                    <span className="text-xs font-semibold text-primary">Usar</span>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Templates prontos para publicar
        </div>
      </footer>
    </main>
  );
}
